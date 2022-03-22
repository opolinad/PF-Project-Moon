import { Router, Request, Response } from 'express'
const User = require('../models/User')
const Post = require('../models/Post')
const router = Router()

router.get('/:id', async (req:Request, res:Response) => {
    const { id } = req.params
    const { page } : {page?: number}= req.query

    try {
        const user = await User.findById(id)
        let posts : any = []
        if(user.favouritesCategories.length) {
            for(let i = 0; i < user.favouritesCategories.length; i++) {
                let postsAux = await Post.find({})
                console.log(postsAux)
                postsAux.filter((post: any) => post.categories.inlcudes(user.favouritesCategories[i]))
                console.log(postsAux)
                posts.concat(postsAux)
            }
            console.log(posts)
        }

        if(user.followingId.length) { 
            for(let j =0; j < user.followingId.length; j++){
                let postsFollow = await Post.find({})
                postsFollow.filter((post: any) => post.userid === user.followingId[j] || post.shareId === user.followingId)
                posts.concat(postsFollow)
            }
            console.log(posts)
        }

        if(posts.length) { 
        posts.sort((function (a:any, b:any) {
            if (a.createdAt < b.createdAt) {
              return 1;
            }
            if (a.createdAt > b.createdAt) {
              return -1;
            }
            return 0;
          }))
          console.log(posts)
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
        console.log(err)
        res.status(400).json(err)
    }
})

module.exports =  router;