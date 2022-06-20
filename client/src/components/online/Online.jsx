import "./online.css";

export default function Online({user}){
  return (
    <li className="rightF">
    <div className="rightProfileImgContainer">
      <img className="rightProfileImg" src={user.profilePicture} alt="" />
      <span className="rightOnline"></span>
    </div>
    <span className="rightUsername">{user.username}</span>
  </li>
  )
}