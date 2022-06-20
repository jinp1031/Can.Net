import "./share.css";
import { MdPermMedia,MdLocationPin } from "react-icons/md";
import { BsEmojiExpressionlessFill } from "react-icons/bs";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Share() {

  const {user} = useContext(AuthContext);
  const desc = useRef();
  const [file,setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc:desc.current.value
    }
    if(file){
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("file",file);
      data.append("name",fileName);
      newPost.img = fileName;
      try{
        await axios.post(`/upload`, data);
      }catch(err){
        console.log(err)
      }
    }
    try{
      await axios.post('/posts', newPost)
      window.location.reload();
    }catch(err){

    }
  }


  return (
    <div className="shareContainer">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={user.profilePicture || "https://images.unsplash.com/photo-1586136194012-35ceaddbd773?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80"} alt="" />
          <input
          className="shareInput"
          placeholder={`${user.username}, wanna share your day with friends?`}
          ref={desc}
          />
        </div>
        <hr className="shareHr" />
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption" >
              <MdPermMedia className="shareIcon"/>
              <span className="shareOptionText">Photo or Video</span>
              <input
              style={{display:"none"}}
              type="file"
              id="file"
              accept=".png,.jpeg,.jpg"
              onChange={(e)=>setFile(e.target.files[0])}/>
            </label>
            <div className="shareOption" >
              <BsEmojiExpressionlessFill className="shareIcon"/>
              <span className="shareOptionText">Emojis</span>
            </div>
            <div className="shareOption" >
              <MdLocationPin className="shareIcon"/>
              <span className="shareOptionText">Location</span>
            </div>
          </div>
          <button className="sharebtn" type="submit">Share</button>
        </form>
      </div>
    </div>
  )
}
