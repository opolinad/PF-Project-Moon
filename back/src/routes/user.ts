import { Router, Request, Response } from 'express'
const User = require('../models/User')
const router = Router()

router.put('/:id', async (req:Request,res:Response) => {
    const { id } = req.params

    try {
        const putUser = await User.findByIdAndUpdate(
            id, 
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

router.delete('/:id', async (req:Request,res:Response) => {
    const { id } = req.params

    try {
        await User.findByIdAndDelete(id)
        res.json('The user has been deleted :C...')
    } catch (error) {
        res.status(404).json(error)
    }
})

module.exports =  router;