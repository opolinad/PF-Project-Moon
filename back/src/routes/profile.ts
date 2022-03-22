import { Router, Request, Response } from 'express'
const User = require('../models/User')
const Post = require('../models/Post')
const router = Router()

//Muestra los post hehcos y compartidos de un usuario
router.get('/:id', async(req:Request, res:Response) => {
    const { id } = req.params
    const { page = 1 }: { page?: number } = req.query;
    try {
        const posts = await Post.find({ userid: id}) // || shareId : id
        const shares = await Post.find({ shareId: id})
        const profile = posts.concat(shares).sort(function (a:any, b:any) {
            if (a.createdAt < b.createdAt) {
              return 1;
            }
            if (a.createdAt > b.createdAt) {
              return -1;
            }
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
        res.status(400).json(error)
    }
})

module.exports = router;