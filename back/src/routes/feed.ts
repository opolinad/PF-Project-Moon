import { Router, Request, Response } from 'express'
const User = require('../models/User')
const Post = require('../models/Post')
const router = Router()

router.get('/:id', (req:Request, res:Response) => {
    const { id } = req.params
    const { page } : {page?: number}= req.query
    console.log(typeof page)
    try {
        const user = User.findById(id)
        const posts = Post.find({})
        posts.filter(post => post.categories.includes(user.favouritesCategories.toString()))
        if(page) {
            const lastPage = page * 20
            const firstPage = lastPage - 20
            const postsShow = posts.slice(firstPage, lastPage)
            return res.json(postsShow)
        } else {
            const postsShow = posts.splice(0,20)
            res.json(postsShow)
        }
    } catch (err) {
        res.status(400).json(err)
    }
})

module.exports =  router;