import {Schema,model} from 'mongoose'

export interface Post {

    userid: string //Dueño original del post
    username?: string 
    profilePhoto?: string
    images?: string [] // Pueden ser varias imagenes
    description: string
    likes?: object [] // Detalles de los usuarios que le dieron like en un objeto
    title?: string 
    categories?: string []
    comments?: object [] // Detalles de los usuarios que comentaron, junto con una propiedad comment
    price?: string
    premium?: boolean // Se pasa a true si el post esta solo para usuarios premium
    shares?: object [] // Detalles de los usuarios que compartieron el post
    sharesId?: string []
    share?: boolean // Sirve como flag para saber si el post es compartido
    shareId?: string // Cuando se comparte se pone la id del usuario
    sharename?: string
    sharePhoto?: string
    
}

const UserSchema = new Schema<Post>(
    {
        userid: {type: String, required:true},
        username: {type: String},
        profilePhoto: {type: String},
        images: {type: []},
        description: {type: String, required:true},
        likes: {type: []},
        title: {type:String},
        categories: {type: []},
        comments: {type: []},
        price: {type:String},
        premium: {type:Boolean},
        shares: {type:[]},
        sharesId: {type:[]},
        share: {type: Boolean},
        shareId: {type: String},
        sharename: {type: String},
        sharePhoto: {type: String},
        
    },
    {timestamps:true}
    )

module.exports = model<Post>('Post', UserSchema)