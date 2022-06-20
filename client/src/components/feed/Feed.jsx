import { useState, useEffect, useContext } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

//export to Profile
export default function Feed({username}) {
  const [posts, setPosts] = useState([]);
  const {user} = useContext(AuthContext);

  useEffect(()=>{
    const getAll = async () => {
      const res = username
      ? await axios.get(`/posts/profile/${username}`)
      : await axios.get("/posts/profile/Fred%20Cheng")
      setPosts(res.data);
    }
    getAll();
  },[username]);
  return (
    <div className="feed">
     <div className="feedWrapper">
      <Share />
      {posts.map(post =>(
        <Post key={post._id} post={post}/>
      ))}
     </div>
    </div>
  )
}