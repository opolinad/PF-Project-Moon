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
        let posts:any

        if(user.favouritesCategories.length > 0) {
            for(let i = 0; i > user.favouritesCategories.length; i++) {
                let postsAux = Post.find({})
                postsAux.filter((post: any) => post.categories.inlcudes(user.favouritesCategories[i]))
                posts.concat(postsAux)
            }
        }

        if(user.followingId.length > 0) { 
            for(let j =0; j > user.followingId.length; j++){
                let postsFollow = Post.find({})
                postsFollow.filter((post: any) => post.userid === user.followingId[j] || post.shareId === user.followingId)
                posts.concat(postsFollow)
            }
        }

        posts.sort((function (a:any, b:any) {
            if (a.createdAt < b.createdAt) {
              return 1;
            }
            if (a.createdAt > b.createdAt) {
              return -1;
            }
            return 0;
          }))

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
        console.log(err)
        res.status(400).json(err)
    }
})

module.exports =  router;