import { Router, Request, Response } from 'express'
const User = require('../models/User')
const Post = require('../models/Post')
const router = Router()

//Todas las categorias
router.get('/', (req:Request, res:Response) => {
    res.json({categories: ['anime',
        'comics',
        'customization',
        'digitalart',
        'fantart',
        'fantasy',
        'gameart',
        'horror',
        'photography',
        'pixelart',
        'sciencefiction',
        'streetart',
        'wallpaper']})
})

// Obtener los posts de una categoria
router.get('/:category', async (req:Request, res:Response) => {
    let { category } = req.params
    const { page = 1 } : { page?: number }= req.query
    try { 
        let posts = await Post.find({ categories: category})
        .populate('user',{username: 1, profilePhoto:1})
        .populate('likes',{username: 1, profilePhoto:1})
        .populate({ path:'comments', populate: { path: 'user', model:'User', select: 'username profilePhoto'}})
        .populate('shares',{username: 1, profilePhoto:1})
        .populate('shareUser',{username: 1, profilePhoto:1})
        .populate('soldUser',{username: 1, profilePhoto:1})

        posts = posts.filter((post:any) => !post.premium)

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
        res.status(500).json({error: err})
    }
})

module.exports =  router;