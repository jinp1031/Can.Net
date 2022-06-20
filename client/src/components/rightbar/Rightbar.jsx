import "./rightbar.css";
import { BsFillGiftFill } from "react-icons/bs";
import { RiUserAddFill,RiUserUnfollowLine } from "react-icons/ri";
import {Users} from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Rightbar({user}) {

  const [friends, setFriends] = useState([]);
  const {user:currentUser, dispatch} = useContext(AuthContext);
  const [isFollow, setIsFollow] = useState(currentUser.followings.includes(user?.id));


  useEffect(()=>{
    const getFri = async ()=>{
      try{
        const friList = await axios.get(`/users/friends/${user._id}`);
        setFriends(friList.data);
      }catch(err){
        console.log(err);
      }
    };
    getFri();
  },[user])

  const addFollow = async () =>{
    try{
      if(isFollow){
        await axios.put(`/users/${user._id}/unfollow`,{userId:currentUser._id});
        dispatch({type:"UNFOLLOW",payload:user._id});
      } else{
        await axios.put(`/users/${user._id}/follow`,{userId:currentUser._id})
        dispatch({type:"FOLLOW",payload:user._id});
      }
    }catch(err){
      console.log(err)
    }
    setIsFollow(!isFollow);
  };

  const HomeRightbar = () => {
    return (<>
      <div className="birthdayContainer" >
          <BsFillGiftFill className="birIcon" />
          <span className="birText"> <b>Tomato</b>'s birday today</span>
      </div>
      <img className="rightAd" src="https://images.unsplash.com/photo-1520256788229-d4640c632e4b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80" alt="advertisement" />
      <h4 className="rightTitle">Online Friends</h4>
      <ul className="rightFL">
          {Users.map(user=>(
            <Online key={user.id} user={user} />
          ))}
      </ul>
    </>)
  }
  const ProfileRightbar = () => {
    return (
     <>
     {user.username !== currentUser.username && (
       <button
       className="followBtn"
       onClick={addFollow}
       >
        {isFollow ? "Unfollow" : "Follow"}
        {isFollow ? <RiUserUnfollowLine /> :<RiUserAddFill />}
       </button>
     )}
     <h2 className="rbTitle">User Information</h2>
     <div className="rbInfos">
      <div className="rbInfo">
        <span className="rbInfoKey">City:</span>
        <span className="rbInfoValue">{user.city}</span>
      </div>
      <div className="rbInfo">
        <span className="rbInfoKey">From:</span>
        <span className="rbInfoValue">{user.from}</span>
      </div>
      <div className="rbInfo">
        <span className="rbInfoKey">Relationship:</span>
        <span className="rbInfoValue">
          {user.relationship === 1 ? "Single"
          : user.relationship === 2 ? "Married"
          : "Secret"}</span>
      </div>
     </div>
     <h2 className="rbTitle">User Friends</h2>
     <div className="rbFollowings">
      {friends.map(friend => (
        <Link to={`/profile/${friend.username}`} style={{textDecoration:"none"}}>
          <div key={friend._id}
          className="rbFollowing">
            <img
            className="rbFollowImg"
            src={friend.profilePicture || "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80"}
            alt=""></img>
            <span className="rbFollowUsername">{friend.username}</span>
          </div>
        </Link>
      ))}
     </div>
     </>
    )
  }
  return (
    <div className="rightbar">
      <div className="rightWrapper">
      {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  )
}