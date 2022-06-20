import { createContext, useReducer } from "react"
import AuthReducer from "./AuthReducer";
const INITIAL_STATE = {
  user:{
    _id: "62ae315673abdd9ca65c774b",
    username: "Fred Cheng",
    email: "Fred@gmail.com",
    profilePicture: "https://images.unsplash.com/photo-1546561892-65bf811416b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
    "coverPicture": "",
    "followers": [],
    "followings": [],
    "isAdmin": false
},
  isFetching:false,
  error:false
}

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(AuthReducer,INITIAL_STATE);
  return (
    <AuthContext.Provider
    value={{
      user:state.user,
      isFetching:state.isFetching,
      error:state.error,
      dispatch
      }}>
        {children}
    </AuthContext.Provider>
  )
}