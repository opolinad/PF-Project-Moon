import { Schema, model } from "mongoose";

const MessageSchema = new Schema(
  {
    conversationId: { type: String },
    sender: {type: Schema.Types.ObjectId, ref:'User'},
    text: { type: String },
  },
  { timestamps: true }
);

module.exports = model("Message", MessageSchema);