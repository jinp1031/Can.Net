import axios from "axios";
import { useRef } from "react";
import "./register.css";
import {useHistory} from "react-router";

export default function Register(){
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if(passwordAgain.current.value !== password.current.value){
      password.current.setCustomValidity("Passwords not match!")
    }else{
      const user = {
        username:username.current.value,
        email:email.current.value,
        password:password.current.value
      }
      try{
        await axios.post("/auth/register",user);
        history.push("login");
      }catch(err){
        console.log(err)
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <form className="loginBox" onSubmit={handleClick}>
            <input className="loginInput" placeholder="Username" ref={username} required/>
            <input className="loginInput" placeholder="Email" ref={email} type="email" required/>
            <input className="loginInput" placeholder="Password" ref={password} type="password" required/>
            <input className="loginInput" placeholder="Password Again" ref={passwordAgain} type="password" required/>
            <button className="loginBtn" type="submit">Sign up</button>
            <button className="loginRegiBtn">Log in</button>
          </form>
        </div>
        <div className="loginRight">
          <h3 className="loginLogo">Can.net</h3>
          <span className="loginDesc">May the force be with you</span>
        </div>
      </div>
    </div>

  )
}