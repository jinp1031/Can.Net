import Home from './pages/home/Home.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from './components/login/Login.jsx';
import Register from './components/register/Register.jsx';
import Profile from './pages/profile/Profile.jsx';
import Messenger from './pages/messenger/Messenger.jsx';
import { AuthContext } from './context/AuthContext.js';
import { useContext } from 'react';

function App() {

  const {user} = useContext(AuthContext)
  return (
    <Router>
      <Switch>
        <Route exact path="/" >
          {user ? <Home /> : <Login />}
        </Route>
        <Route path="/login">
          {user ? <Redirect to="/"/> : <Login />}
        </Route>
        <Route path="/register">
        {user ? <Redirect to="/"/> : <Register />}
        </Route>
        <Route path="/messenger">
        {!user ? <Redirect to="/"/> : <Messenger />}
        </Route>
        <Route path="/profile/:username">
          <Profile />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
