import "./navbar.css";
import {BsSearch,BsChatRightDotsFill} from 'react-icons/bs';
import { IoMdPerson } from 'react-icons/io';
import { IoNotificationsSharp } from "react-icons/io5";
import {Link} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function NavBar() {

  const {user} = useContext(AuthContext);


  return (
    <div className="navbarContainer">
      <div className="navbarLeft">
        <Link to="/" style={{textDecoration:"none"}}>
        <span className="navbarlogo" >Can.net</span>
        </Link>
        </div>
      <div className="navbarCenter">
        <div className="searchbar">
          <BsSearch className="searchIcon"/>
          <input placeholder="Search Users" className="searchInput" />
        </div>
      </div>
      <div className="navbarRight">
        <div className="navbarLinks">
          <span className="navbarLink">Homepage</span>
          <span className="navbarLink">Feeds</span>
        </div>
        <div className="navbarIcons">
          <div className="navbarIcon">
            <IoMdPerson />
            <span className="navbarIconBadge">1</span>
          </div>
          <div className="navbarIcon">
            <BsChatRightDotsFill />
            <span className="navbarIconBadge">2</span>
          </div>
          <div className="navbarIcon">
            <IoNotificationsSharp />
            <span className="navbarIconBadge">3</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`} >
          <img src={user.profilePicture || "https://images.unsplash.com/photo-1589661654496-f5222b481fe0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"} alt="pic" className="navbarImg" />
        </Link>
      </div>
    </div>
  )
}