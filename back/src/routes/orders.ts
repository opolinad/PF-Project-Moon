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
    const { page } : {page?: number}= req.query
    try {
        const user = await User.findById(idUser, {history: 1})
        .populate({path: 'history', populate: { path: 'user to', model:'User', select: 'username profilePhoto'}})
        const orders = user.history
        const donations = orders.filter((order: any) => order.type === 'donation')
        donations.sort((a:any, b:any) => {
            if (a.createdAt < b.createdAt) return 1;
            if (a.createdAt > b.createdAt) return -1;
            return 0;
        })
        if(page) {
            const lastPage = page * 20
            const firstPage = lastPage - 20
            const donationsShow = donations.slice(firstPage, lastPage)
            return res.json(donationsShow)
        } else {
            const donationsShow = donations.splice(0,20)
            res.json(donationsShow)
        }
    } catch(err) {
        res.status(400).json({error: err})
    }
})

router.get('/solds/:idUser', async (req:Request, res:Response) => {
    const { idUser } = req.params
    const { page } : {page?: number}= req.query

    try {
        const user = await User.findById(idUser, {history: 1})
        .populate({path: 'history', populate: [{ path: 'user to', model:'User', select: 'username profilePhoto'},{path:'post', model:'Post', select: 'images'}]})
        const orders = user.history
        const solds = orders.filter((order: any) => order.type === 'sold')
        solds.sort((a:any, b:any) => {
            if (a.createdAt < b.createdAt) return 1;
            if (a.createdAt > b.createdAt) return -1;
            return 0;
        })
        if(page) {
            const lastPage = page * 20
            const firstPage = lastPage - 20
            const soldsShow = solds.slice(firstPage, lastPage)
            return res.json(soldsShow)
        } else {
            const soldsShow = solds.splice(0,20)
            res.json(soldsShow)
        }
    } catch(err) {
        console.log(err)
        res.status(400).json({error: err})
    }
})

router.get('/shopped/:idUser', async (req:Request, res:Response) => {
    const { idUser } = req.params
    const { page } : {page?: number}= req.query

    try {
        const user = await User.findById(idUser, {history: 1})
        .populate({path: 'history', populate: [{ path: 'user to', model:'User', select: 'username profilePhoto'},{path:'post', model:'Post', select: 'images'}]})
        const orders = user.history
        const buys = orders.filter((order: any) => order.type === 'buy')
        buys.sort((a:any, b:any) => {
            if (a.createdAt < b.createdAt) return 1;
            if (a.createdAt > b.createdAt) return -1;
            return 0;
        })
        if(page) {
            const lastPage = page * 20
            const firstPage = lastPage - 20
            const buysShow = buys.slice(firstPage, lastPage)
            return res.json(buysShow)
        } else {
            const buysShow = buys.splice(0,20)
            res.json(buysShow)
        }
    } catch(err) {
        res.status(400).json({error: err})
    }
})

module.exports = router