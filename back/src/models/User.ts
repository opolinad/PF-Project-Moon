import {Schema,model} from 'mongoose'

export interface User {
    username?: string;
    email: string;
    password: string;
    image?: string;
}

const UserSchema = new Schema<User>(
    {
        username: {type:String,unique:true},
        email: {type:String,unique:true},
        password: {type:String,required:true},
        image: {type:String},
    },
    {timestamps:true}
    )

module.exports = model<User>('User', UserSchema)