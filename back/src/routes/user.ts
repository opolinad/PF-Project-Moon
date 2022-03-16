import { Router, Request, Response } from 'express'
import { verifyToken } from '../helpers/verifyToken'
const User = require('../models/User')
const router = Router()
const CryptoJS = require('crypto-js')

router.put('/:id',verifyToken, async (req:Request,res:Response) => {
    const { password } = req.body
    if(password){
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.HASH_CRYPTO
        ).toString()
    }
    try {
        const putUser = await User.findByIdAndUpdate(
            req.params.id, 
            {
                $set: req.body
            },
            { new: true }
        )
        res.json(putUser)
    } catch (error) {
        res.status(404).json(error)
    }
})

router.delete('/:id', async (req:Request,res:Response) => {
    const { id } = req.params

    try {
        await User.findByIdAndDelete(id)
        res.json('The user has been deleted :C...')
    } catch (error) {
        res.status(404).json(error)
    }
})

module.exports =  router;