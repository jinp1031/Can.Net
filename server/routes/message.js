const router = require("express").Router();
const Message = require("../models/Message");

//post new msg
router.post('/', async(req, res)=>{
  const newMsg = new Message(req.body);
  try{
    const saveMsg = await newMsg.save();
    res.status(201).send(saveMsg);
  }catch(err){
    res.status(500).send(err)
  }
})

//get all msgs
router.get('/:conversationId', async(req, res)=>{
  try{
    const allMegs = await Message.find({
      conversationId:req.params.conversationId
    })
    res.status(200).send(allMegs);
  }catch(err){
    res.status(500).send(err)
  }
})
module.exports = router