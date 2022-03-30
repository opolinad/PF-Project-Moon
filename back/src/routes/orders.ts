import { Router, Request, Response } from 'express'
const User = require('../models/User')
const Order = require('../models/Order')
const router = Router()

router.post('/:idUser',async(req:Request, res:Response) => {
    const { idUser } = req.params

    try {
        const user = await User.findById(idUser)
        const newOrder = await new Order(req.body)
        const savedOrder = await newOrder.save()
        await user.updateOne({$push: {history: savedOrder._id}})
        const userFrom = await User.findById(req.body.user)
        await userFrom.updateOne({$push: {history: savedOrder._id}})
        res.json(user.history)
    } catch (err) {
        console.log(err)
        res.status(400).json({error: err})
    }
})

router.get('/:idUser', async (req:Request, res:Response) => {
    const { idUser } = req.params

    try {
        const user = await User.findById(idUser, { history: 1}).
        populate({ path:'history', populate: { path: 'user', model:'User', select: 'username profilePhoto'}})
        res.json(user)
    } catch(err) {
        res.status(400).json({error: err})
    }
})

router.get('/donations/:idUser', async (req:Request, res:Response) => {
    const { idUser } = req.params

    try {
        const user = await User.findById(idUser, {history: 1})
        .populate({path: 'history', populate: { path: 'user', model:'User', select: 'username profilePhoto'}})
        const orders = user.history
        const donations = orders.filter((order: any) => order.type === 'donation')
        res.json(donations)
    } catch(err) {
        res.status(400).json({error: err})
    }
})

router.get('/solds/:idUser', async (req:Request, res:Response) => {
    const { idUser } = req.params

    try {
        const user = await User.findById(idUser, {history: 1})
        .populate({path: 'history', populate: { path: 'user', model:'User', select: 'username profilePhoto'}})
        const orders = user.history
        const solds = orders.filter((order: any) => order.type === 'sold')
        res.json(solds)
    } catch(err) {
        res.status(400).json({error: err})
    }
})

router.get('/shopped/:idUser', async (req:Request, res:Response) => {
    const { idUser } = req.params

    try {
        const user = await User.findById(idUser, {history: 1})
        .populate({path: 'history', populate: { path: 'user', model:'User', select: 'username profilePhoto'}})
        const orders = user.history
        const buys = orders.filter((order: any) => order.type === 'buy')
        res.json(buys)
    } catch(err) {
        res.status(400).json({error: err})
    }
})

module.exports = router