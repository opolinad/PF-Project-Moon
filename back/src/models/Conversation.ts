import { Schema, model } from "mongoose";

const ConversationSchema = new Schema(
    {
      members: {type: [{type: Schema.Types.ObjectId, ref:'User'}]},
    },
    { timestamps: true }
  );
  
  module.exports = model("Conversation", ConversationSchema);