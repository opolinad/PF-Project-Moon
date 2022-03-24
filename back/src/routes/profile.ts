import { Router, Request, Response } from 'express'
const User = require('../models/User')
const Post = require('../models/Post')
const router = Router()

//Muestra los post hehcos y compartidos de un usuario
router.get('/:idUser', async(req:Request, res:Response) => {
    const { idUser } = req.params
    const { page = 1 }: { page?: number } = req.query;
    try {
        const posts = await Post.find({ user: idUser})
        .populate('user',{username: 1, profilePhoto:1})
        .populate('likes',{username: 1, profilePhoto:1})
        .populate('comments',{user:1, comment: 1})
        .populate('shares',{username: 1, profilePhoto:1})
        .populate('shareUser',{username: 1, profilePhoto:1})
        .populate('soldUser',{username: 1, profilePhoto:1})

        const shares = await Post.find({ shareUser: idUser})
        .populate('user',{username: 1, profilePhoto:1})
        .populate('likes',{username: 1, profilePhoto:1})
        .populate('comments',{user: 1, comment: 1})
        .populate('shares',{username: 1, profilePhoto:1})
        .populate('shareUser',{username: 1, profilePhoto:1})
        .populate('soldUser',{username: 1, profilePhoto:1})

        const profile = posts.concat(shares).sort((a:any, b:any) => {
            if (a.createdAt < b.createdAt) return 1
            if (a.createdAt > b.createdAt) return -1
            return 0;
          })
        if(page) {
            const lastPage = page * 20
            const firstPage = lastPage - 20
            const postsShow = profile.slice(firstPage, lastPage)
            return res.json(postsShow)
        } else {
            const postsShow = profile.splice(0,20)
            res.json(postsShow)
        }
        res.json(profile)
    } catch (error) {
      console.log(error)
        res.status(500).json({error: error})
    }
})

module.exports = router;