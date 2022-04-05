import { Router, Request, Response } from 'express';
import nodemailer from "nodemailer";
import dotenv from "dotenv";
const User = require('../models/User');
const router = Router();
dotenv.config();
router.get("/", async (req: Request, res: Response) => {
    const { email } = req.query;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(200).json({ msg: "User doesn't exist" });
        if (!user.password) return res.status(200).json({ msg: "User must log in through Google/Microsoft" });
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: `${process.env.EMAIL_ADDRESS}`,
                pass: `${process.env.EMAIL_PASSWORD}`,
            }
        });
        const mailOptions = {
            from: 'protocolmoon@gmail.com',
            to: `${user.email}`,
            subject: 'Link To Reset Password',
            text:
                'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
                + 'Please click on the following link, or paste this into your browser to complete the process:\n\n'
                + `http://localhost:4000/password_reset/${user._id}\n\n`
                + 'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        };
        transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
                console.error(err);
            } else {
                res.status(200).json('recovery email sent');
            }
        });
    } catch (error) {
        console.error(error);
    }
})
module.exports = router;