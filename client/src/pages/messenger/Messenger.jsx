import { useContext, useEffect, useRef, useState } from "react";
import Chat from "../../components/chat/Chat";
import Message from "../../components/message/Message";
import NavBar from "../../components/navBar/NavBar";
import Onlinechat from "../../components/onlinechat/Onlinechat";
import { AuthContext } from "../../context/AuthContext";
import "./messenger.css";
import axios from "axios";

export default function Messenger(){
  const[chats, setChats] = useState([]);
  const[currentChats, setCurrentChats] = useState(null);
  const[msg, setMsg] = useState([]);
  const[newMsg, setNewMsg] = useState("");
  const {user} = useContext(AuthContext);
  const scrollRef = useRef();

  console.log(user,'user')

  useEffect(()=>{
    const getChats = async () => {
      try{
        const res = await axios.get(`/conversations/${user._id}`)
        setChats(res.data);
      }catch(err){
        console.log(err)
      }
    };
    getChats();
  },[user._id]);

  useEffect(() => {
    const getMsg = async() => {
      try{
        const res = await axios.get(`/messages/${currentChats?._id}`);
        setMsg(res.data);
      }catch(err){
        console.log(err)
      }
    }
    getMsg();
  },[currentChats]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nmsg = {
      sender: user._id,
      text:newMsg,
      conversationId: currentChats._id
    };
    try {
      const res = await axios.post("/messages",nmsg);
      setMsg([...msg, res.data])
      setNewMsg("")
    }catch(err){
      console.log(err)
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior:"smooth"});
  },[msg]);

  return (
    <>
    <NavBar />
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <input
          placeholder="Search friends"
          className="chatMenuInput" />
          {chats.map(chat => (
            <div onClick={()=>setCurrentChats(chat)}>
              <Chat
              key={chat._id}
              chat={chat}
              cUser={user}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
        {currentChats ? (
        <>
            <div className="chatBoxTop">
            {msg.map(m => (

              <div ref={scrollRef}>
                <Message
                key={m._id}
                msg={m}
                own={m.sender === user._id}
                />
                 {console.log(m,"MSGGGGGG")}
              </div>
            ))}
            </div>
            <div className="chatBoxBottom">
              <textarea
              className="chatMessageInput"
              placeholder="hello?"
              onChange={(e)=>setNewMsg(e.target.value)}
              value={newMsg}
              ></textarea>
              <button
              className="chatBtn"
              onClick={handleSubmit}
              >Send</button>
            </div>
        </>)
        : (<span className="noConversationText">Start Chatting with your friends</span>)}
        </div>
      </div>
      <div className="chatOnline">
        <div className="chatOnlineWrapper">
          <Onlinechat />
        </div>
      </div>
    </div>
    </>
  )
}