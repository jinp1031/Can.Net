import "./profile.css";
import NavBar from '../../components/navBar/NavBar';
import Feed from '../../components/feed/Feed';
import Sidebar from '../../components/sidebar/Sidebar';
import Rightbar from '../../components/rightbar/Rightbar';
import {useState,useEffect} from 'react';
import axios from "axios";
import { useParams} from "react-router";

export default function Profile(){
  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(()=>{
    const getUsers = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    }
    getUsers();
  },[username]);
  return (
    <>
      <NavBar />
      <div className='profileContainer'>
        <Sidebar />
        <div className="pRight" >
          <div className="pTopRight">
            <div className="pCover">
              <img className="profilePostImg" src={user.coverPicture || "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80"} alt="" />
              <img className="profileUserImg" src={user.profilePicture || "https://images.unsplash.com/photo-1589661654496-f5222b481fe0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"} alt="" />
            </div>
            <div className="pInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.description || "this person is too lazy to introduce his/herself"}</span>
            </div>
          </div>
          <div className="pBottomRight">
            <Feed username={username}/>
            <Rightbar user={user}/>
          </div>
        </div>
      </div>
    </>
  )
}