import "./message.css";
import {format} from "timeago.js";

export default function Message({msg,own}){

  return (
    <div className={own ? "message own" : "message" }>
      <div className="msgTop">
        <img
        className="msgImg"
        src="https://images.unsplash.com/photo-1546561892-65bf811416b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80" alt="" />
        <p className="msgText">{msg.text}</p>
      </div>
      <div className="msgBottom">
        {format(msg.createdAt)}
      </div>
    </div>
  )
}