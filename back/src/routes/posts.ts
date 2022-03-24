import {Router, Request, Response} from 'express'

const router = Router()
const Post = require('../models/Post')
const User = require('../models/User')
const Comment = require('../models/Comment')

import {verifyToken} from '../helpers/verifyToken'

//Create Post
router.post('/:idUser',verifyToken ,async (req:Request, res:Response) => {
    const { idUser } = req.params
    if(idUser === req.body.user) { 
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).json({error: error})
    }
    } else {
        res.status(400).json('El id del usuario no coincide')
    }
})

// Obtener todos los posts
router.get('/', async(req:Request, res:Response) => {
    const { page = 1 } : { page?: number }= req.query
    try { 
        const posts = await Post.find({})
        .populate('user',{username: 1, profilePhoto:1})
        .populate('likes',{username: 1, profilePhoto:1})
        .populate({ path:'comments', populate: { path: 'user', model:'User', select: 'username profilePhoto'}})
        .populate('shares',{username: 1, profilePhoto:1})
        .populate('shareUser',{username: 1, profilePhoto:1})
        .populate('soldUser',{username: 1, profilePhoto:1})
        posts.sort((a:any, b:any) => {
            if (a.createdAt < b.createdAt) return 1
            if (a.createdAt > b.createdAt) return -1
            return 0;
          })

        if(page) {
            const lastPage = page * 20
            const firstPage = lastPage - 20
            const postsShow = posts.slice(firstPage, lastPage)
            return res.json(postsShow)
        } else {
            const postsShow = posts.splice(0,20)
            res.json(postsShow)
        }
        res.json(posts)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

// Obtener un post
router.get('/:idPost', async (req:Request, res:Response) => {
    const { idPost } = req.params
    try {
        const post = await Post.findById(idPost)
        .populate('user',{username: 1, profilePhoto:1})
        .populate('likes',{username: 1, profilePhoto:1})
        .populate({ path:'comments', populate: { path: 'user', model:'User', select: 'username profilePhoto'}})
        .populate('shares',{username: 1, profilePhoto:1})
        .populate('shareUser',{username: 1, profilePhoto:1})
        .populate('soldUser',{username: 1, profilePhoto:1})
        res.json(post)
    } catch (err) {
        res.status(500).json({error: err})
    }
})

// Obtener un post
router.get('/:id/posts', async (req:Request, res:Response) => {
    const { id } = req.params
    try {
        const post = await Post.find()
        const result = post.filter((f:any) => f.userid === id)
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json(err)
    }
})

// Editar post
router.put('/:idPost',verifyToken, async (req:Request,res:Response) => {
    const { idPost } = req.params
    
    try {
        const putPost = await Post.findByIdAndUpdate(
            idPost, 
            {
                $set: req.body
            },
            { new: true }
            ).populate('user',{username: 1, profilePhoto:1})
            .populate('likes',{username: 1, profilePhoto:1})
            .populate({ path:'comments', populate: { path: 'user', model:'User', select: 'username profilePhoto'}})
            .populate('shares',{username: 1, profilePhoto:1})
            .populate('shareUser',{username: 1, profilePhoto:1})
            .populate('soldUser',{username: 1, profilePhoto:1})
            res.json(putPost)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

// Eliminar post
router.delete('/:idPost', verifyToken, async (req:Request,res:Response) => {
    const { idPost } = req.params
    
    try {
        await Post.findByIdAndDelete(idPost)
        res.json('The Post has been deleted...')
    } catch (error) {
        res.status(500).json({error: error})
    }
})

// Comentar un post
router.put('/comment/:idPost', async(req:Request, res:Response) => {
    const { idPost } = req.params

    try {
        const post = await Post.findById(idPost)
        const newComment = new Comment(req.body)
        const saveComment = await newComment.save()
        await post.updateOne({$push: {comments:  saveComment._id}})
        const returnPost = await Post.findById(idPost,{comments:1})
        .populate('comments',{username: 1, profilePhoto:1, comment: 1})
        res.json(returnPost.comments)
    } catch (error) {
        console.log(error)
        res.status(400).json("Algo paso... Vuelve a intentarlo mas tarde")
    }
})

//Borrar un comentario
router.put('/deleteCommet/:idPost', async(req:Request, res:Response) => {
    const { idPost } = req.params
    const { idComment } = req.body
    try {
        const post = await Post.findById(idPost)
        await post.updateOne({$pull: { comments: idComment}})
        await Comment.findByIdAndDelete(idComment)
        const returnPost = await Post.findById(idPost, {comments: 1})
        .populate('comments',{username: 1, profilePhoto:1, comment: 1})
        res.json(returnPost.comments)
    } catch (error) {
        res.status(400).json("No se pudo borrar el comentario... Vuelve a intenarlo")
    }
})

//Like / dislike a post
router.put('/like/:idPost', verifyToken, async (req:Request, res:Response) => {
    const { idPost } = req.params
    const { idUser } = req.body
    try {

        const post = await Post.findById(idPost, {likes: 1})
        if(!post.likes.includes(idUser)){
            await post.updateOne({$push: {likes: idUser}})
            const returnPost = await Post.findById(idPost, {likes: 1})
            .populate('likes',{username: 1, profilePhoto:1})
            res.status(200).json(returnPost)
        }else {
            await post.updateOne({$pull: {likes: idUser}})
            const returnPost = await Post.findById(idPost, {likes: 1})
            .populate('likes',{username: 1, profilePhoto:1})
            res.status(200).json(returnPost)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error})
    }
})

// Compartir publicacion
router.post('/share/:idPost', async (req:Request, res:Response) => {
    const { idPost } = req.params
    const { idUser } = req.body
    try {
        let post = await Post.findById(idPost)
        if(!post.shares.includes(idUser)) { 
            
        const share = {
            user: post.user,
            images: post.images,
            description: post.description,
            likes: [],
            categories: post.categories,
            comments: [],
            shares: [],
            share: true,
            shareUser: idUser,
        }

            const sharePost = new Post(share)
            const savedPost = await sharePost.save()

            await post.updateOne({$push: {shares: idUser}})
            res.json(savedPost)
        } else {
            res.status(400).json('Ya compartiste esta publicacion antes')
        }
    } catch(error) {
        res.status(500).json({error: error})
    }
})


module.exports =  router;