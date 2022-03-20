import {Router, Request, Response} from 'express'

const router = Router()
const Post = require('../models/Post')
const User = require('../models/User')

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

// Comentar un post
router.put('/comment/:id', async(req:Request, res:Response) => {
    const { id } = req.params
    const { comment } = req.body
    try {
        const post = await Post.findById(id)
        await post.updateOne({$push: {comments:  comment}})
        res.json("Se agrego el comentario")
    } catch (error) {
        res.status(400).json("Algo paso... Vuelve a intentarlo mas tarde")
    }
})

//Borrar un comentario
router.put('/deleteCommet/:id', async(req:Request, res:Response) => {
    const { id } = req.params
    const { comment } = req.body
    try {
        const post = await Post.findById(id)
        await post.updateOne({$pull: { comments: comment}})
        res.json("Se ha eliminado tu comentario")
    } catch (error) {
        res.status(400).json("No se pudo borrar el comentario... Vuelve a intenarlo")
    }
})

//Like / dislike a post
router.put('/like/:id', verifyToken, async (req:Request, res:Response) => {
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

router.post('/share/:id', async (req:Request, res:Response) => {
    const { id } = req.params
    const { userId } = req.body
    try {
        const post = await Post.findById(id)
        delete post._id
        const user = await User.findById(userId)
        if(!post.sharesId.includes(userId)) { 
            const sharePost = new Post(post)
            // await sharePost.updateOne({_id: post._id + "share"})
            await sharePost.updateOne({sharesId: userId})
            // sharePost.sharesId = userId
            await sharePost.updateOne({sharename: user.username})
            // sharePost.sharename = user.username
            await sharePost.updateOne({share: true})
            // sharePost.share = true
            await sharePost.updateOne({sharePhoto: user.profilePhoto})
            // sharePost.sharePhoto = user.profilePhoto
            await post.updateOne({$push: {sharesId: userId}})
            const savedPost = await sharePost.save()
            res.json(savedPost)
        } else {
            res.status(400).json('Ya compartiste esta publicacion antes')
        }
    } catch(error) {
        res.status(400).json(error)
    }
})


module.exports =  router;