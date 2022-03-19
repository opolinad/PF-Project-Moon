import {Schema,model} from 'mongoose'

export interface User {

    username?: string
    fullName?: string
    birthday?: string
    email: string
    password?: string
    profilePhoto?: string
    backgroundPhoto?: string
    followers?: object []
    followersId?: string [] // Añadido para mayor facilidad al buscar datos
    following?: object []
    followingId?: string [] // Añadido para mayor facilidad al buscar datos
    favourites?: object []
    favouritesId?: string [] // Añadido para mayor facilidad al buscar datos
    favouritesCategories?: string []
    history?: object [] //historial de compra guarda lo necesario en objetos
    messages?: object [] // bandeja de mensajes
    premium?: object [] // Guardar los datos de los usuarios que son premium de este usuario (los que le pagan cada mes)
    premiumId?: string [] // Añadido para mayor facilidad al buscar datos
    myPremium?: object [] //Guardar los datos de los following premium que el usario paga cada mes
    myPremiumId?: string[] // Añadido para mayor facilidad al buscar datos
    
}

const UserSchema = new Schema<User>(
    {
        username: {type:String},
        fullName: {type:String},
        birthday: {type:String},
        email: {type:String,unique:true},
        password: {type:String},
        profilePhoto: {type:String},
        backgroundPhoto: {type:String},
        followers: {type: []},
        followersId: {type: []},
        following: {type: []},
        followingId: {type: []},
        favourites: {type: []},
        favouritesId: {type:[]},
        favouritesCategories: {type: []},
        history: {type: []},
        messages: {type: []},
        premium: {type: []},
        premiumId: {type: []},
        myPremium: {type: []},
        myPremiumId: {type: []}

    },
    {timestamps:true}
    )

module.exports = model<User>('User', UserSchema)