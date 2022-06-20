import "./friendlist.css";

export default function Friendlist({user}){
  return (
    <div>
      <li className="sideFriend">
        <img className="sideFriImages" src={user.profilePicture} alt="" />
        <span className="sideFriName">{user.username}</span>
      </li>
    </div>

  )
}