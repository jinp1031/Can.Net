import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";

export default function Login(){
  const email = useRef();
  const password = useRef();
  const {isFetching, dispatch} = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall({
      email:email.current.value,
      password:password.current.value},
      dispatch
    );
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <form className="loginBox" onSubmit={handleClick}>
            <input
            className="loginInput"
            type="email"
            placeholder="Email"
            ref={email}
            required />
            <input
            className="loginInput"
            type="password"
            placeholder="Password"
            ref={password}
            minLength="5"
            required
            />
            <button className="loginBtn" type="submit" >{isFetching ? "Loading..." : "Login"}</button>
            <span className="loginForget">New Here?</span>
            <button className="loginRegiBtn">Sign Up</button>
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