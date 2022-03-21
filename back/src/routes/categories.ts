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
    try { 
        const posts = await Post.find({ categories: category})
        res.json(posts)
    } catch (err) {
        res.status(400).json(err)
    }
})

module.exports =  router;