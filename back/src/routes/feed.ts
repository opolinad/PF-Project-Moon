import { Router, Request, Response } from 'express'
const User = require('../models/User')
const Post = require('../models/Post')
const router = Router()

router.get('/:id', async (req:Request, res:Response) => {
    const { id } = req.params
    const { page } : {page?: number}= req.query
    const { filter, order, category, search } =req.query // type = designsOnly || textOnly
    // let searchString : = search.toString()
    try {
        const user = await User.findById(id)
        let posts : object [] = []

        if(search) {
            
            let postSearch = await Post.find({})

            postSearch = postSearch.filter((post : any) => post.title?.includes(search))

            let userSearch = await User.find().where({})

            userSearch = userSearch.filter((user : any) => user.username?.includes(search))
        

            if (filter) {
                if(filter === "designsOnly") postSearch = postSearch.filter((post : any) => post.images.length > 0)
                postSearch = postSearch.filter((post : any) => post.images.length === 0)
            }

            if (category) { 
                posts = postSearch.filter((post : any) => post.categories.includes(category))
            } else {
                posts = postSearch
            }

            if (order === "trending") {
                posts.sort((function (a:any, b:any) {
                    if (a.likes.length < b.likes.length) return 1;
                    if (a.likes.length > b.likes.length) return -1;
                    return 0;
                }))
            } else {
                posts.sort((function (a:any, b:any) {
                    if (a.createdAt < b.createdAt) return 1;
                    if (a.createdAt > b.createdAt) return -1;
                    return 0;
                }))
            }

            if(page) {
                const lastPage = page * 20
                const firstPage = lastPage - 20
                const postsShow = posts.slice(firstPage, lastPage)
                const userShow = userSearch.slice(firstPage, lastPage)
                return res.json({ posts: postsShow, users: userShow})
            } else {
                const postsShow = posts.splice(0,20)
                const userShow = userSearch.slice(0, 20)
                return res.json({ posts: postsShow, users: userShow})
            }
        }

        if (category) {
            posts = await Post.find({ categories: category})
        } else {
            posts = await Post.find({})
        }

        if (filter) {
            if(filter === "designsOnly") posts = posts.filter((post : any) => post.images.length > 0)
            posts = posts.filter((post : any) => post.images.length === 0)
        }


        if (order === "trending") {
            posts.sort((function (a:any, b:any) {
                if (a.likes.length < b.likes.length) return 1;
                if (a.likes.length > b.likes.length) return -1;
                return 0;
            }))
        } else {
            posts.sort((function (a:any, b:any) {
                if (a.createdAt < b.createdAt) return 1;
                if (a.createdAt > b.createdAt) return -1;
                return 0;
            }))
        }

        if(page) {
            const lastPage = page * 20
            const firstPage = lastPage - 20
            const postsShow = posts.slice(firstPage, lastPage)
            return res.json(postsShow)
        } else {
            const postsShow = posts.splice(0,20)
            return res.json(postsShow)
        }
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
})

router.get('/home/:id', async(req:Request, res:Response) => {
    const { id } = req.params
    const { page } : {page?: number}= req.query

    try {
        const user = await User.findById(id)
        let posts : object [] = []
        let postsAux = await Post.find({})

        if(!user.following.length) {

        posts = postsAux.filter((post:any) => post.categories.some((category: any) => user.favouritesCategories.includes(category)))

        posts.sort((function (a:any, b:any) {
            if (a.createdAt < b.createdAt) return 1;
            if (a.createdAt > b.createdAt) return -1;
            return 0;
        }))

        if(page) {
            const lastPage = page * 20
            const firstPage = lastPage - 20
            const postsShow = posts.slice(firstPage, lastPage)
            return res.json(postsShow)
        } else {
            const postsShow = posts.splice(0,20)
            return res.json(postsShow)
        }
        }
        
        posts = postsAux.filter((post:any) => user.followingId.includes(post.userid) || user.followingId.includes(post.shareId))

        posts.sort((function (a:any, b:any) {
            if (a.createdAt < b.createdAt) return 1;
            if (a.createdAt > b.createdAt) return -1;
            return 0;
        }))

        if(page) {
            const lastPage = page * 20
            const firstPage = lastPage - 20
            const postsShow = posts.slice(firstPage, lastPage)
            return res.json(postsShow)
        } else {
            const postsShow = posts.splice(0,20)
            return res.json(postsShow)
        }

    } catch(err) {
        res.status(400).json(err)
    }
})

router.get('/NewForYou/:id', async(req:Request, res:Response) => {
    const { id } = req.params
    const { page } : {page?: number}= req.query
    
    try {
        const user = await User.findById(id)
        let posts : object [] = []
            
        let postsAux = await Post.find({})
            
        posts = postsAux.filter((post:any) => post.categories.some((category: any) => user.favouritesCategories.includes(category)))

        posts.sort((function (a:any, b:any) {
            if (a.createdAt < b.createdAt) return 1;
            if (a.createdAt > b.createdAt) return -1;
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

    } catch (error) {
        res.status(400).json(error)
    }

})

module.exports =  router;