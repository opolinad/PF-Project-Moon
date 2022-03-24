import {Schema,model} from 'mongoose'

const UserSchema = new Schema(
    {
        user: {type: Schema.Types.ObjectId, ref:'User'},
        images: {type: []},
        title: {type:String},
        description: {type: String, required:true},
        categories: {type: []},
        likes: {type: [{type: Schema.Types.ObjectId, ref:'User'}]},
        comments: {type: [{type: Schema.Types.ObjectId, ref:'Comment'}]},
        price: {type:String},
        premium: {type:Boolean},
        share: {type:Boolean},
        shares: {type: [{type: Schema.Types.ObjectId, ref:'User'}]},
        shareUser: {type: Schema.Types.ObjectId, ref:'User'},
        sold: {type: Boolean},
        soldUser: {type: Schema.Types.ObjectId, ref:'User'},
    },
    {timestamps:true}
    )

module.exports = model('Post', UserSchema)