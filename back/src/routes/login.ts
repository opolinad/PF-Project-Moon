import { Router, Request, Response, NextFunction } from 'express'
import { config } from 'dotenv';
import passport from "passport";
import "../Middleware/google";
import "../Middleware/microsoft";
const User = require('../models/User')
const router = Router()
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')
config()

router.post('/', async (req: Request, res: Response) => {
  const { email } = req.body
  try {

    const user = await User.findOne({ email });
    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.HASH_CRYPTO)
    const originPassword = hashedPassword.toString(CryptoJS.enc.Utf8)
    const accessToken = jwt.sign({
      id: user._id
    }, process.env.JWT_KEY,
      { expiresIn: '1d' }
    )
    const { ...others } = user._doc
    !user || originPassword !== req.body.password
      ? res.status(404).json('Wrong credentials')
      : res.json({ ...others, accessToken })
  } catch (error) {
    res.status(500).json({error: error})
  }
})

router.get("/session", async (req: Request, res: Response) => {
  let userEmail;
  let infoUser: any = req.user;
  console.log("req",req)
  const { email } = infoUser._json;
  const { mail } = infoUser._json;
  const { emails } = infoUser;
  mail?userEmail=mail:(email?userEmail=email:userEmail=emails[0].value)
  const user = await User.findOne({ email:userEmail });

  const { ...others } = user._doc;
  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_KEY, { expiresIn: '1d' });
  console.log("at", accessToken, others)
  res.json({ ...others, accessToken });
})

router.get('/google',
  passport.authenticate('google', {
    scope:
      ['email', 'profile']
  }
  )
);
router.get('/google/callback', passport.authenticate('google', { failureRedirect: 'https://project-moon.vercel.app/', successRedirect: 'https://project-moon.vercel.app/home' }));
router.get('/microsoft', passport.authenticate('microsoft'));
router.get('/microsoft/callback',
  passport.authenticate('microsoft', { failureRedirect: 'https://project-moon.vercel.app/', successRedirect: 'https://project-moon.vercel.app/home' }));

module.exports = router;
