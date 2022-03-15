import { Router, Request, Response} from 'express'
const User = require('../models/User') 
const router = Router()


router.post('/', async (req:Request,res:Response) => {
    const { username, email, password } = req.body

    const newUser = new User({
        username,
        email,
        password
    })
    
    try {
        const savedUser = await newUser.save()
        res.json(savedUser)
    } catch (error) {
        res.status(404).json(error)
    }
})

module.exports =  router;