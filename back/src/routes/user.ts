import { Router, Request, Response } from 'express'
import { verifyToken } from '../helpers/verifyToken'
const Conversation = require('../models/Conversation')
const User = require('../models/User')
const router = Router()
const CryptoJS = require('crypto-js')


// Editar usuario
router.put('/:idUser',verifyToken, async (req:Request,res:Response) => {
    const { password } = req.body
    if(password){
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.HASH_CRYPTO
        ).toString()
    }
    try {
        const putUser = await User.findByIdAndUpdate(
            req.params.idUser, 
            {
                $set: req.body
            },
            { new: true }
        )
        .populate('followers', {username: 1, profilePhoto: 1})
        .populate('followings', {username: 1, profilePhoto: 1})
        .populate('favourites', {title: 1, images:1})
        .populate({ path:'comments', populate: { path: 'user', model:'User', select: 'username profilePhoto'}})
        .populate('premium', {username: 1, profilePhoto: 1})
        .populate('myPremium', {username: 1, profilePhoto: 1})
        res.json(putUser)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

// Follow/Unfollow id por params del que va a seguir e userId por body de a quien vas a seguir
router.put('/:idUser/follow', async (req: Request, res: Response) => {
    if(req.body.userId !== req.params.idUser) {
        try {
            const user = await User.findById(req.params.idUser,{followings:1})
            const currentUser = await User.findById(req.body.userId,{followers:1})
            
            if(!user.followings.includes(req.body.userId)) {
                await user.updateOne({$push: {followings: req.body.userId}})
                await currentUser.updateOne({$push: {followers: req.params.idUser}})
                const conversation = await Conversation.find({members: req.body.userId})
                if(!conversation.length) { 
                const newConversation = new Conversation({
                    members: [req.body.userId, req.params.idUser],
                  })
                await newConversation.save()
                }
                return res.status(200).json('Esta siguiendo a este usuario')
            }else {
                await user.updateOne({$pull: {followings: req.body.userId}})
                await currentUser.updateOne({$pull: {followers: req.params.idUser}})
                return res.status(200).json('Dejaste de seguir a este usuario')
            }
        } catch (error){
            console.log(error)
            res.status(500).json({error: error})
        }

    } else{
        res.status(403).json('No te podes seguir a vos mismo')
    }
})

//Agregar un usuario premium
router.put('/:idUser/premium', async (req: Request, res: Response) => {
    if(req.body.userId !== req.params.idUser) {
        try {
            const user = await User.findById(req.params.idUser,{premium:1})
            const currentUser = await User.findById(req.body.userId,{myPremium:1})
            
            if(!user.premium.includes(req.body.userId)) {
                await user.updateOne({$push: {premium: req.body.userId}})
                await currentUser.updateOne({$push: {myPremium: req.params.idUser}})
                const userThrow = await User.findById(req.params.idUser,{premium:1})
                .populate('premium', {username: 1, profilePhoto: 1})
                const currentUserThrow = await User.findById(req.body.userId,{myPremium:1})
                .populate('myPremium', {username: 1, profilePhoto: 1})
                return res.status(200).json({user: userThrow.premium, currentUser: currentUserThrow.myPremium})
            }else {
                return res.status(200).json('You are alredy a premium user')
            }
        } catch (error){
            console.log(error)
            res.status(500).json({error: error})
        }

    } else{
        res.status(403).json('This is your profile...')
    }
})

// Borrar usuario
router.delete('/:idUser', verifyToken, async (req:Request,res:Response) => {
    const { idUser } = req.params

    try {
        await User.findByIdAndDelete(idUser)
        res.json('The user has been deleted :C...')
    } catch (error) {
        res.status(500).json({error: error})
    }
})

module.exports =  router;