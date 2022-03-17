import { Router, Request, Response } from 'express'
import { verifyToken } from '../helpers/verifyToken'
const Post = require('../models/Post')
const router = Router()

router.put('/:id',verifyToken, async (req:Request,res:Response) => {
    const { id } = req.params

    try {
        const putPost = await Post.findByIdAndUpdate(
            id, 
            {
                $set: req.body
            },
            { new: true }
        )
        res.json(putPost)
    } catch (error) {
        res.status(404).json(error)
    }
})

router.delete('/:id', verifyToken, async (req:Request,res:Response) => {
    const { id } = req.params

    try {
        await Post.findByIdAndDelete(id)
        res.json('The Post has been deleted...')
    } catch (error) {
        res.status(404).json(error)
    }
})

module.exports =  router;