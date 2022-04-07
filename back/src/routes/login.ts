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
var email:string = "";
router.post('/', async (req: Request, res: Response) => {
  const { email } = req.body
  try {
    const user = await User.findOne({ email })
    .populate('followers', {username: 1, profilePhoto: 1})
    .populate('followings', {username: 1, profilePhoto: 1})
    .populate('favourites', {title: 1, images:1})
    .populate({ path:'comments', populate: { path: 'user', model:'User', select: 'username profilePhoto'}})
    .populate('premium', {username: 1, profilePhoto: 1})
    .populate('myPremium', {username: 1, profilePhoto: 1})
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
    res.status(500).json({ error: error })
  }
})

router.get("/session", async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email });
    const { ...others } = user._doc;
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_KEY, { expiresIn: '1d' });
    res.json({ ...others, accessToken });
  } catch (err) {
    console.error(err);
  }
})

router.get('/google',
  passport.authenticate('google', {
    scope:
      ['email', 'profile']
  }
  )
);
router.get('/google/callback', passport.authenticate('google', { failureRedirect: process.env.NODE_ENV === "production" ? "https://projectmoon.vercel.app/" : "http://localhost:4000/" }), (req: Request, res: Response) => {
let infoUser:any = req.user;
email=infoUser?.email;
res.redirect(process.env.NODE_ENV === "production" ? "https://projectmoon.vercel.app/home" : "http://localhost:4000/home");
});
router.get('/microsoft', passport.authenticate('microsoft'));
router.get('/microsoft/callback',
  passport.authenticate('microsoft', { failureRedirect: process.env.NODE_ENV === "production" ? "https://projectmoon.vercel.app/" : "http://localhost:4000/"}),(req: Request, res: Response) => {
    let infoUser:any = req.user;
    email=infoUser?.emails[0].value;
    res.redirect(process.env.NODE_ENV === "production" ? "https://projectmoon.vercel.app/home" : "http://localhost:4000/home");
    });

module.exports = router;
