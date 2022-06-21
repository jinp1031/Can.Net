const router = require("express").Router();
const Conversation = require("../models/Conversation");


//post new chat
router.post("/", async (req,res)=>{
  const newConv = new Conversation({
    members:[req.body.senderId,req.body.receiverId],
  });
  try{
    const saveConv = await newConv.save();
    res.status(201).send(saveConv)
  }catch(err){
    res.status(500).send(err)
  }
})

//get all user chat history
router.get('/:userId', async(req,res)=>{
  try{
    const conv = await Conversation.find({
      members:{ $in:[req.params.userId]}
    })
    res.status(200).send(conv)

  }catch(err){
    res.status(500).send(err)
  }

})
module.exports = router