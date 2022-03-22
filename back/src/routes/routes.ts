import { Router } from 'express'
const router = Router()

const registerRoute = require('./register')
const loginRoute = require('./login')
const userRoute = require('./user')
const usersRoute = require('./users')
const postsRoute = require('./posts')
const favoritesRoute = require('./favourites')
const feedRoute = require('./feed')
const categoriesRoute = require('./categories')
const profileRoute = require('./profile')

router.use('/register', registerRoute)
router.use('/login', loginRoute)
router.use('/user', userRoute)
router.use('/users', usersRoute)
router.use('/posts', postsRoute)
router.use('/favourites', favoritesRoute)
router.use('/feed', feedRoute)
router.use('/categories', categoriesRoute)
router.use('/profile', profileRoute)

module.exports = router;