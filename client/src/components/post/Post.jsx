import "./post.css";
import { GrMoreVertical } from "react-icons/gr";
import { AiFillLike } from "react-icons/ai";
import {useState,useEffect} from 'react'
import axios from "axios";
import {format} from "timeago.js";
import {Link} from "react-router-dom";

export default function Post({post}) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});

  const likeHandler = () =>{
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }

  useEffect(()=>{
    const getUsers = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    }
    getUsers();
  },[post.userId]);

  return (
    <div className="post">
      <div className="postWrapper" >
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
            <img className="postProfileImg" src={user.profilePicture || "https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"}alt="postProfileImg" />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <GrMoreVertical className="postIcon" />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={post.images} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <AiFillLike className="likeIcon" onClick={likeHandler}/>
            <span className="likeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postComment">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  )
}