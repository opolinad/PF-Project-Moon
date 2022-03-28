import { Router, Request, Response } from 'express'
const Conversation = require('../models/Conversation')
const router = Router()

router.post("/", async (req:Request, res:Response) => {
    const newConversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId],
    });
  
    try {
      const savedConversation = await newConversation.save();
      res.status(200).json(savedConversation);
    } catch (err) {
      res.status(500).json(err);
    }
});
  
router.get("/:idUser", async (req, res) => {
    try {
      const conversation = await Conversation.find({
        members: { $in: [req.params.idUser] },
      });
      res.status(200).json(conversation);
    } catch (err) {
      res.status(500).json(err);
    }
});
  
router.get("/find/:firstIdUser/:secondIdUser", async (req, res) => {
    try {
      const conversation = await Conversation.findOne({
        members: { $all: [req.params.firstIdUser, req.params.secondIdUser] },
      });
      console.log(conversation)
      res.status(200).json(conversation)
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
});

module.exports = router