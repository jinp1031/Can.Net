import "./sidebar.css";
import{MdRssFeed,MdOutlineEmojiEvents} from "react-icons/md";
import{BsQuestionSquareFill,BsFillBookmarkCheckFill} from "react-icons/bs";
import Friendlist from "../friendlist/Friendlist";
import {Users} from "../../dummyData";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sideWrapper">
        <ul className="sideList">
          <li className="sideItem">
              <MdRssFeed className="sideIcon"/>
              <span className="sideText">Feed</span>
          </li>
          <li className="sideItem">
              <BsQuestionSquareFill className="sideIcon"/>
              <span className="sideText">Questions</span>
          </li>
          <li className="sideItem">
              <BsFillBookmarkCheckFill className="sideIcon"/>
              <span className="sideText">Bookmark</span>
          </li>
          <li className="sideItem">
              <MdOutlineEmojiEvents className="sideIcon"/>
              <span className="sideText">Events</span>
          </li>
        </ul>
        <button className="sideBtn">Show More</button>
        <hr className="sideHr"/>
        <ul className="sideFriendList">
          {Users.map(user => (
            <Friendlist key={user.id} user={user}/>
          ))}
        </ul>
      </div>
    </div>
  )
}