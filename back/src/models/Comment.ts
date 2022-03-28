import {Schema,model} from 'mongoose'

const CommentSchema = new Schema(
    {

        user: {type: Schema.Types.ObjectId, ref:'User'},
        comment: {type: String},
        score:{type:Number}

    },
    {timestamps:true}
)

module.exports = model('Comment', CommentSchema)