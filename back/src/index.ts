import  {Request, Response} from 'express';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from "passport";
import { dbConnect } from './db';
import cookieSession from "cookie-session";
const allRoute = require('./routes/routes')
const app = express();
dotenv.config()

app.use(cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60* 100 }));
app.use(passport.session());

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4000');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });

app.use('/api', allRoute)

app.listen(3001, () => {
    dbConnect()
    console.log('Server on PORT 3001')
})