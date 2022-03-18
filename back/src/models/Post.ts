import {Schema,model} from 'mongoose'

export interface Post {
    userid: string
    image?: string;
    description: string;
    likes?: string [];
    title?: string;
    categories: string []
}

const UserSchema = new Schema<Post>(
    {
        userid: {type:String},
        image: {type:String},
        title: {type:String},
        likes: {type: []},
        description: {type: String, required:true},
        categories: {type: [], required:true}
        
    },
    {timestamps:true}
    )

module.exports = model<Post>('Post', UserSchema)