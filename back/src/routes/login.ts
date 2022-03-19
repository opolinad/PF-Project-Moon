import { Router, Request, Response} from 'express'
import {config} from 'dotenv';
import passport from "passport";
import "../Middleware/google";
import "../Middleware/microsoft";
const User = require('../models/User') 
const router = Router()
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')
config()

router.post('/', async (req:Request,res:Response) => {
    const { email } = req.body
    try { 

        const user = await User.findOne({email});

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.HASH_CRYPTO)
        const originPassword = hashedPassword.toString(CryptoJS.enc.Utf8)

        const accessToken = jwt.sign({
            id: user._id
        },process.env.JWT_KEY,
        {expiresIn: '1d'}
        ) 
        
        const {...others} = user._doc


        !user || originPassword !== req.body.password
        ? res.status(404).json('Wrong credentials') 
        : res.json({...others,accessToken})
    } catch (error) {
        res.status(404).json(error)
    }
})

router.get("/session/:email",async (req:Request,res:Response)=>{
    const {email}=req.params;
    const user = await User.findOne({email});
    const accessToken = jwt.sign({
        id: user._id
    },process.env.JWT_KEY,
    {expiresIn: '1d'}
    )
    const {...others} = user._doc
    
})

router.get('/google',
  passport.authenticate('google', {
    scope:
      ['email', 'profile']
  }
  )
);

router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: '/login/google/success',//Cambiar a la página de inicio de sesión
    failureRedirect: 'login/google/failure', //Cambiar a la página de login, pero con un mensaje de error
  }));

router.get('/microsoft',
  passport.authenticate('microsoft'));

router.get('/microsoft/callback',
  passport.authenticate('microsoft', { failureRedirect: '/login' }),//cambiar a la página de login con mensaje de error
  function (req: Request, res: Response) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

module.exports =  router;