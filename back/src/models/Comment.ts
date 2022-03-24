import {Schema,model} from 'mongoose'

const UserSchema = new Schema(
    {

        user: {type: Schema.Types.ObjectId, ref:'User'},
        comment: {type: String},
        score:{type:Number}

    },
    {timestamps:true}
)

module.exports = model('Comment', UserSchema)