const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Register
router.post("/register", async (req,res)=> {
try{
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password,salt);

  const newUser = await new User({
    username:req.body.username,
    email:req.body.email,
    password: hashedPassword
  })

  const user = await newUser.save();
  res.status(200).send(user);
}catch(err){
  res.status(500).send(err);
}
})

//Login
router.post("/login", async (req,res)=>{
  try{
    const user = await User.findOne({
      email:req.body.email
    });
    !user && res.status(404).send("user not found");

    const validP = await bcrypt.compare(req.body.password, user.password);
    !validP && res.status(400).send("wrong password, try again");

    res.send(user);
  }catch(err){
    res.status(500).send(err);
  }

})
module.exports = router