const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config()

export const dbConnect = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log('MongoDB Connected!!'))
    .catch(()=>console.log('Error'))
}