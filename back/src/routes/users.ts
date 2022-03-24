import { Router, Request, Response } from 'express'
const User = require('../models/User')
const router = Router()

router.get('/', async(req:Request, res:Response) => {
    try {
        const users = await User.find({})
        .populate('followers', {username: 1, profilePhoto: 1})
        .populate('followings', {username: 1, profilePhoto: 1})
        .populate('favourites', {title: 1, images:1})
        .populate({ path:'comments', populate: { path: 'user', model:'User', select: 'username profilePhoto'}})
        .populate('premium', {username: 1, profilePhoto: 1})
        .populate('myPremium', {username: 1, profilePhoto: 1})
        res.json(users)
    } catch(err) {
        res.status(400).json(err)
    }
})

router.get('/:idUser', async(req:Request, res:Response) => {
    const { idUser } = req.params

    try {
        const user = await User.findById(idUser)
        .populate('followers', {username: 1, profilePhoto: 1})
        .populate('followings', {username: 1, profilePhoto: 1})
        .populate('favourites', {title: 1, images:1})
        .populate({ path:'comments', populate: { path: 'user', model:'User', select: 'username profilePhoto'}})
        .populate('premium', {username: 1, profilePhoto: 1})
        .populate('myPremium', {username: 1, profilePhoto: 1})
        res.json(user)
    } catch(err) {
        res.status(400).json(err)
    }
})

module.exports =  router;