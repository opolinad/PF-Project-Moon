import {Schema,model} from 'mongoose'

export interface Post {

    userid: string
    image?: string
    description: string
    likes?: string []
    title?: string
    categories?: string []
    comments?: object []
    price?: string
    premium?: boolean
    share?: boolean
    shareId?: string
    
}

const UserSchema = new Schema<Post>(
    {
<<<<<<< HEAD
        userid: {type:String},
=======
        userid: {type: String, required:true},
>>>>>>> d9c6f50b0ec380fc06ad30d9dbb44b359042bfff
        image: {type:String},
        title: {type:String},
        likes: {type: []},
        description: {type: String, required:true},
        categories: {type: []},
        comments: {type: []},
        price: {type:String},
        premium: {type:Boolean},
        share: {type: Boolean},
        shareId: {type: String}
        
    },
    {timestamps:true}
    )

module.exports = model<Post>('Post', UserSchema)