import { Router } from 'express'
const router = Router()

const registerRoute =require('./register')
const loginRoute =require( './login')
const userRoute =require( './user')
const usersRoute =require('./users')

router.use('/register', registerRoute)
router.use('/login', loginRoute)
router.use('/user', userRoute)
router.use('/users', usersRoute)

module.exports =  router;