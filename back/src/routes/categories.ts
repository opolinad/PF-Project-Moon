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

module.exports =  router;