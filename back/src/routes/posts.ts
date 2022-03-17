import {Router, Request, Response} from 'express'

const router = Router()
const Post = require('../models/Post')

import {verifyToken} from '../helpers/verifyToken'

//Create Post
router.post('/:id',verifyToken ,async (req:Request, res:Response) => {
    const { id } = req.params
    if(id === req.body.userid) { 
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).json(error)
    }
    } else {
        res.status(400).json('El id del usuario no coincide')
    }
})

// Obtener todos los posts
router.get('/', async(req:Request, res:Response) => {
    try { 
        const posts = await Post.find({})
        res.json(posts)
    } catch (err) {
        res.status(500).json(err)
    }
})

// Obtener un post
router.get('/:id', async (req:Request, res:Response) => {
    const { id } = req.params
    try {
        const post = await Post.findById(id)
        res.json(post)
    } catch (err) {
        res.status(400).json(err)
    }
})

//Like / dislike a post
router.put('/:id/like', verifyToken, async (req:Request, res:Response) => {
    try {
        const post = await Post.findById(req.params.id)
        if(!post.likes.includes(req.body.userId)){
        await post.updateOne({$push: {likes: req.body.userId}})
        res.status(200).json("The post has been liked")
        }else {
            await post.updateOne({$pull: {likes: req.body.userId}})
            res.status(200).json("The post has been disliked")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

// Editar post
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


// Eliminar post
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