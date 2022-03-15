import { Router } from 'express'
const router = Router()

const registerRoute =require('./register')
const loginRoute =require( './login')
const userRoute =require( './user')

router.use('/register', registerRoute)
router.use('/login', loginRoute)
router.use('/user', userRoute)


module.exports =  router;