import { Router, Request, Response } from 'express'
import { verifyToken } from '../helpers/verifyToken'
const User = require('../models/User')
const router = Router()
const CryptoJS = require('crypto-js')


// Editar usuario
router.put('/:id',verifyToken, async (req:Request,res:Response) => {
    const { password } = req.body
    if(password){
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.HASH_CRYPTO
        ).toString()
    }
    try {
        const putUser = await User.findByIdAndUpdate(
            req.params.id, 
            {
                $set: req.body
            },
            { new: true }
        )
        res.json(putUser)
    } catch (error) {
        res.status(404).json(error)
    }
})

// Follow/Unfollow id por params del que va a seguir e userId por body de a quien vas a seguir
router.put('/:id/follow', async (req: Request, res: Response) => {
    if(req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            const objUser = { username: user.username, profilePhoto: user.profilePhoto, _id: user._id}
            const objCurrentUser = { username: currentUser.username, profilePhoto: currentUser.profilePhoto, _id: currentUser._id }
            if(!user.followingId.includes(req.body.userId)) {
                await user.updateOne({$push: {following: objCurrentUser}})
                await user.updateOne({$push: {followingId: req.body.userId}})
                await currentUser.updateOne({$push: {followers: objUser}})
                await currentUser.updateOne({$push: {followersId: req.params.id}})
                return res.status(200).json('Esta siguiendo a este usuario')
            }else {
                await user.updateOne({$pull: {following: objCurrentUser}})
                await user.updateOne({$pull: {followingId: req.body.userId}})
                await currentUser.updateOne({$pull: {followers: objUser}})
                await currentUser.updateOne({$pull: {followersId: req.params.id}})
                return res.status(200).json('Dejaste de seguir a este usuario')
            }
        } catch (error){
            res.status(500).json(error)
        }

    } else{
        res.status(403).json('No te podes seguir a vos mismo')
    }
})

// Borrar usuario
router.delete('/:id', verifyToken, async (req:Request,res:Response) => {
    const { id } = req.params

    try {
        await User.findByIdAndDelete(id)
        res.json('The user has been deleted :C...')
    } catch (error) {
        res.status(404).json(error)
    }
})

module.exports =  router;