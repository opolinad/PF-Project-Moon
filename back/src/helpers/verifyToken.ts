import { Request,Response,NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
const dotenv = require('dotenv');
dotenv.config()
const KEY:any = process.env.JWT_KEY

export const verifyToken = (req:Request,res:Response,next:NextFunction) => {
   try {
       let authHeader:any = req.headers.token
       if(authHeader){
               verify(authHeader,KEY,(err:any) =>{
                    if(err) return res.status(403).json("Token is not valid")
                    next()
               })
       }else{
           return res.status(401).json("You are not authenticated!")
       }
   } catch (error) {
       res.status(500).json(error)
   }
}
