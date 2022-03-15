import { Router, Request, Response} from 'express'
const User = require('../models/User') 
const router = Router()
const CryptoJS = require('crypto-js')

router.post('/', async (req:Request,res:Response) => {
    const { username } = req.body
    
    try {
        const user = await User.findOne({
            username
        })

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.HASH_CRYPTO)
        const originPassword = hashedPassword.toString(CryptoJS.enc.Utf8)

        !user || originPassword !== req.body.password
        ? res.status(404).json('Wrong credentials') 
        : res.json(user)
    } catch (error) {
        res.status(404).json(error)
    }
})

module.exports =  router;