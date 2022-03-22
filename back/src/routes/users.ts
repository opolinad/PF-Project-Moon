import { Router, Request, Response } from 'express'
const User = require('../models/User')
const router = Router()

router.get('/', async(req:Request, res:Response) => {
    try {
        const users = await User.find({})
        res.json(users)
    } catch(err) {
        res.status(400).json(err)
    }
})

router.get('/:id', async(req:Request, res:Response) => {
    const { id } = req.params

    try {
        const user = await User.findById(id)
        res.json(user)
    } catch(err) {
        res.status(400).json(err)
    }
})

module.exports =  router;