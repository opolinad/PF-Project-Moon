import {Schema,model} from 'mongoose'

export interface Follows {
    followers: number []
    following: number []
    
}

const UserSchema = new Schema<Follows>(
    {
        followers: {type: []},
        following: {type: []},
    },
    {timestamps:true}
    )

module.exports = model<Follows>('Follows', UserSchema)