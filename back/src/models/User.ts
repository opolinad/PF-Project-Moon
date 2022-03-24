import {Schema,model} from 'mongoose'

const UserSchema = new Schema(
    {
        username: {type:String},
        fullName: {type:String},
        birthday: {type:String},
        artist: {type:Boolean},
        admin: {type:Boolean},
        email: {type:String,unique:true},
        password: {type:String},
        profilePhoto: {type:String},
        backgroundPhoto: {type:String},
        followers: {type: [{type: Schema.Types.ObjectId, ref:'User'}]},
        followings: {type: [{type: Schema.Types.ObjectId, ref:'User'}]},
        favourites: {type: [{type: Schema.Types.ObjectId, ref:'Post'}]},
        favouritesCategories: {type: []},
        history: {type: []},
        messages: {type: []},
        comments: {type: [{type: Schema.Types.ObjectId, ref:'Comment'}]},
        premium: {type: [{type: Schema.Types.ObjectId, ref:'User'}]}, //Los que estan suscritos
        myPremium: {type: [{type: Schema.Types.ObjectId, ref:'User'}]}, //A los que yo estoy suscrito

    },
    {timestamps:true}
    )

module.exports = model('User', UserSchema)