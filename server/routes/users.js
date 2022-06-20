const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

//update users
router.put("/:id", async (req,res)=> {
    if(req.body.userId === req.params.id || req.body.isAdmin){
      if(req.body.password){
        try{
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password,salt);

        }catch(err){
          return res.status(500).send(err);
        }
      }
      try{
        const user = await User.findByIdAndUpdate(req.params.id,{$set:req.body});
        res.status(200).send("Account updated")
      }catch(err){
        return res.status(500).send(err);
      }
    }else{
      return res.status(403).send("this is not your account")
    }
})

//delect one user
router.delete("/:id", async (req,res)=> {

  if(req.body.userId === req.params.id || req.body.isAdmin){
    try{
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).send("Account is deleted")
    }catch(err){
      return res.status(500).send(err);
    }
  }else{
    return res.status(403).send("this is not your account")
  }
})

//get one user
router.get('/', async(req,res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try{
    const user = userId
    ? await User.findById(userId)
    : await User.findOne({username: username});
    const {password, updatedAt, ...other} = user._doc;
    res.status(200).send(other);
  }catch(err){
    res.status(500).send(err);
  }
})

//follow
router.put('/:id/follow', async(req,res)=>{
  if(req.body.userId !== req.params.id) {
    try{
      const user = await User.findById(req.params.id);
      const cUser = await User.findById(req.body.userId);
      if(!user.followers.includes(req.body.userId)){
        await user.updateOne({$push:{followers:req.body.userId}});
        await cUser.updateOne({$push:{followings:req.params.id}});
        res.status(200).send("followed");

      }else {
        res.status(403).send("you have followed this user already");
      }
    }catch(err){
      res.status(500).send(err);
    }
  }else{
    res.status(403).send('you can not follow yourself');
  }
})

//unfollow
router.put('/:id/unfollow', async(req,res)=>{
  if(req.body.userId !== req.params.id) {
    try{
      const user = await User.findById(req.params.id);
      const cUser = await User.findById(req.body.userId);
      if(user.followers.includes(req.body.userId)){
        await user.updateOne({$pull:{followers:req.body.userId}});
        await cUser.updateOne({$pull:{followings:req.params.id}});
        res.status(200).send("unfollowed");

      }else {
        res.status(403).send("you have unfollowed this user already");
      }
    }catch(err){
      res.status(500).send(err);
    }
  }else{
    res.status(403).send('you can not unfollow yourself');
  }
})
module.exports = router