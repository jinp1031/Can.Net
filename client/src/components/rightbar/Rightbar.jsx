import "./rightbar.css";
import { BsFillGiftFill } from "react-icons/bs";
import {Users} from "../../dummyData";
import Online from "../online/Online";

export default function Rightbar({user}) {

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
      <div className="rbFollowing">
        <img className="rbFollowImg" src="https://images.unsplash.com/photo-1546561892-65bf811416b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80" alt=""></img>
        <span className="rbFollowUsername">Fred Cheng</span>
      </div>
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