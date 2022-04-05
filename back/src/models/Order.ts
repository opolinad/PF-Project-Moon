import {Schema,model} from 'mongoose'

const OrderSchema = new Schema( 
    {
        type: {type: String},
        user: {type: Schema.Types.ObjectId, ref:'User'},
        to: {type: Schema.Types.ObjectId, ref:'User'},
        post: {type: Schema.Types.ObjectId, ref:'Post'},
        amount: {type: Number},
        card: {type: String},
        ticket:{type:String}

    },
    {timestamps:true}
)

module.exports = model('Order', OrderSchema)