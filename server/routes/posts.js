const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//new post
router.post('/', async (req,res) => {
  const newP = new Post(req.body)
  try{
    const saveP = await newP.save();
    res.status(200).send(saveP)
  }catch(err){
    res.status(500).send(err);
  }
})

//update a post
router.put('/:id',async (req,res)=>{
  try{
    const post = await Post.findById(req.params.id);
    if(post.userId === req.body.userId){
      await post.updateOne({$set:req.body});
      res.status(200).send("post updated");
    }else {
      res.status(403).send("this is not your account")
    }
  } catch(err){
    res.status(500).send(err);
  }
})

//delete a post
router.delete('/:id',async (req,res)=>{
  try{
    const post = await Post.findById(req.params.id);
    if(post.userId === req.body.userId){
      await post.deleteOne();
      res.status(200).send("post deleted");
    }else {
      res.status(403).send("this is not your account")
    }
  } catch(err){
    res.status(500).send(err);
  }
})

//like or dislike a post
router.put("/:id/like", async (req,res)=>{
  try{
    const post = await Post.findById(req.params.id);
    if(!post.likes.includes(req.body.userId)){
      await post.updateOne({$push:{likes:req.body.userId}});
      res.status(200).send("Liked");
    } else {
      await post.updateOne({$pull:{likes:req.body.userId}});
      res.status(200).send("unliked");
    }
  }catch(err){
    res.status(500).send(err);
  }
});

//get a post
router.get("/:id", async(req,res)=>{
  try{
    const post = await Post.findById(req.params.id);
    res.status(200).send(post)
  }catch(err){
    res.status(500).send(err);
  }
})
//get all posts
router.get("/feeds/:userId", async(req,res)=>{
  let feedsArr = [];
  try{
    const cUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({userId:cUser._id});
    const allPosts = await Promise.all(
      cUser.followings.map(id => {
        return Post.find({userId:id});
      })
    )
    res.status(200).send(userPosts.concat(...allPosts))
  }catch(err){
    res.status(500).send(err);
  }
})

//get one user's all posts
router.get("/profile/:username", async(req,res)=>{
  try{
    const user = await User.findOne({username:req.params.username})
    const posts = await Post.find({userId:user._id});
    res.status(200).send(posts)
  }catch(err){
    res.status(500).send(err);
  }
})
module.exports = router