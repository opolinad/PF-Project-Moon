import {Schema,model} from 'mongoose'

export interface User {
    username?: string;
    email: string;
    password: string;
    image?: string;
    followers: number []
    following: number []
}

const UserSchema = new Schema<User>(
    {
        username: {type:String},
        email: {type:String,unique:true},
        password: {type:String,required:true},
        image: {type:String},
        followers: {type: []},
        following: {type: []},
    },
    {timestamps:true}
    )

module.exports = model<User>('User', UserSchema)