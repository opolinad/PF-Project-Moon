import { Router, Request, Response } from 'express'
const User = require('../models/User')
const Post = require('../models/Post')
const router = Router()

//Muestra los post hehcos y compartidos de un usuario
router.get('/:id', async(req:Request, res:Response) => {
    const { id } = req.params
    try {
        const posts = await Post.find({ userid: id}) // || shareId : id
        const shares = await Post.find({ shareId: id})
        res.json(posts.concat(shares))
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = router;