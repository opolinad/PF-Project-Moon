import {Schema,model} from 'mongoose'

export interface Post {

    userid: string //Dueño original del post
    image?: string [] // Pueden ser varias imagenes
    description: string
    likes?: object [] // Detalles de los usuarios que le dieron like en un objeto
    title?: string 
    categories?: string []
    comments?: object [] // Detalles de los usuarios que comentaron, junto con una propiedad comment
    price?: string
    premium?: boolean // Se pasa a true si el post esta solo para usuarios premium
    shares?: object [] // Detalles de los usuarios que compartieron el post
    share?: boolean // Sirve como flag para saber si el post es compartido
    shareId?: string // Cuando se comparte se pone la id del usuario 
    
}

const UserSchema = new Schema<Post>(
    {
        userid: {type: String, required:true},
        image: {type: []},
        description: {type: String, required:true},
        likes: {type: []},
        title: {type:String},
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