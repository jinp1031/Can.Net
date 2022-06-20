import "./share.css";

import { MdPermMedia,MdLocationPin } from "react-icons/md";
import { BsEmojiExpressionlessFill } from "react-icons/bs";

export default function Share() {
  return (
    <div className="shareContainer">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src="https://images.unsplash.com/photo-1586136194012-35ceaddbd773?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80" alt="" />
          <input className="shareInput" placeholder="share your opinions"/>
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption" >
              <MdPermMedia className="shareIcon"/>
              <span className="shareOptionText">Photo or Video</span>
            </div>
            <div className="shareOption" >
              <BsEmojiExpressionlessFill className="shareIcon"/>
              <span className="shareOptionText">Emojis</span>
            </div>
            <div className="shareOption" >
              <MdLocationPin className="shareIcon"/>
              <span className="shareOptionText">Location</span>
            </div>
          </div>
          <button className="sharebtn">Share</button>
        </div>
      </div>
    </div>
  )
}
