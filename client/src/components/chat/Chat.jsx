import axios from "axios";
import { useEffect, useState } from "react";
import "./chat.css";

export default function Chat({chat,cUser}){
  const [user, setUser] = useState(null);

  useEffect(()=>{
    const friendId = chat.members.find(m => m !== cUser._id);
    const getUser = async () => {
      try{
        const res = await axios.get(`/users/?userId=${friendId}`)
        setUser(res.data);
      }catch(err){
        console.log(err)
      }
    }
    getUser()
  },[cUser, chat])

  return (
    <div className="chat">
      <img className="chatImg" src={user?.profilePicture ||"https://images.unsplash.com/photo-1546561892-65bf811416b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80"} alt="" />
      <span className="chatName">{user?.username}</span>
    </div>

  )
}