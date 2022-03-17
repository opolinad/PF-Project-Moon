import {Router, Request, Response} from 'express'

const router = Router()
const Post = require('../models/Post')

import {verifyToken} from '../helpers/verifyToken'

//Create Post
router.post('/',verifyToken ,async (req:Request, res:Response) => {
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports =  router;