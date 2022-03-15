import { Router, Request, Response} from 'express'
const User = require('../models/User') 
const router = Router()

router.post('/', async (req:Request,res:Response) => {
    const { username } = req.body
    
    try {
        const user = await User.findOne({
            username
        })
        !user || user.password !== req.body.password
        ? res.status(404).json('Wrong credentials') 
        : res.json(user)
    } catch (error) {
        res.status(404).json(error)
    }
})

module.exports =  router;