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

router.get('/:category', async (req:Request, res:Response) => {
    let { category } = req.params
    const { page = 1 } : { page?: number }= req.query
    try { 
        const posts = await Post.find({ categories: category})
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
        res.status(400).json(err)
    }
})

module.exports =  router;