import { Router, Request, Response } from 'express'
const User = require('../models/User')
const Post = require('../models/Post')
const router = Router()

router.get('/:id', async (req:Request, res:Response) => {
    const { id } = req.params
    const { page } : {page?: number}= req.query
    const { type, order } =req.query // type = designsOnly || textOnly
    
    try {
        const user = await User.findById(id)
        let posts : object [] = []
        if(user.favouritesCategories.length) {
            
            let postsAux = await Post.find({})
            
            posts = postsAux.filter((post:any) => post.categories.some((category: any) => user.favouritesCategories.includes(category)))
        }

        if(user.followingId.length) { 
            let postsFollow = await Post.find({})

            posts = postsFollow.filter((post: any) => user.followingId.includes(post.userid) || user.followingId.includes(post.shareId))
            // console.log(posts.length)
        } 
        if(order && order !== "Trending") {
            if(posts.length) { 
            posts.sort((function (a:any, b:any) {
                if (a.createdAt < b.createdAt) return 1;
                if (a.createdAt > b.createdAt) return -1;
                return 0;
             }))
            }
        }
        if(order && order !== "Trending") {
            if(posts.length) { 
            posts.sort((function (a:any, b:any) {
                if (a.createdAt < b.createdAt) return 1;
                if (a.createdAt > b.createdAt) return -1;
                return 0;
             }))
            }
        }

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

router.get('/newForYou/:id', async(req:Request, res:Response) => {
    const { id } = req.params
    const { page } : {page?: number}= req.query
    
    try {
        const user = await User.findById(id)
        let posts : object [] = []
        if(user.favouritesCategories.length) {
            
            let postsAux = await Post.find({})
            
            posts = postsAux.filter((post:any) => post.categories.some((category: any) => user.favouritesCategories.includes(category)))
        }
            if(posts.length) { 
            posts.sort((function (a:any, b:any) {
                if (a.createdAt < b.createdAt) return 1;
                if (a.createdAt > b.createdAt) return -1;
                return 0;
             }))
            }

    } catch (error) {
        res.status(400).json(error)
    }

})

module.exports =  router;