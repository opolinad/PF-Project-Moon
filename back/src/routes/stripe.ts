import {Request,Response,Router} from 'express'
const router = Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

router.post('/payment', (req:Request,res:Response) => {
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: 'usd'
    },
    (stripeErr:any, stripeRes:any) => {
        if(stripeErr){
            console.log(stripeErr)
            res.status(500).send({error: stripeErr})
        }else{
            res.status(200).send({success: stripeRes})
        }
    })
})

module.exports = router