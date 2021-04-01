import React, { useEffect, useState, useCallback } from "react";
import { render } from "react-dom";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import Header from "./Header";

//pages imports
import Home from "./Home";
import JoinRoom from "./JoinRoom";
import CreateRoom from "./CreateRoom";
import Room from "./Room";
import CreateLead from "./CreateLead";
import Leads from "./Leads";
import Login from "./AuthPages/Login";
import Signup from "./AuthPages/Signup";
import UserContext from "../contexts/UserContext";

const App = () => {
  let auth_token = localStorage.getItem("token");
  console.log(auth_token);
  const [roomCode, setRoomCode] = useState(null);
  const [token, setToken] = useState(auth_token ? auth_token : null);
  const [userInfo, setUserInfo] = useState(null);

  const handleLogout = () => {
    if (!token) return;
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    };
    fetch("/accounts/auth/token/logout", requestOptions).then((response) => {
      if (response.ok) {
        setToken(null);
      } else {
        console.log("error", response);
      }
    });
  };

  return (
    <UserContext.Provider value={{ token, setToken }}>
      <Header />
      <div className="center">
        <Switch>
          <Route exact path="/">
            {token ? <Redirect to="/home" /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route
            path="/logout"
            render={() => {
              handleLogout();

              return <Redirect to="/login" />;
            }}
          />
          <Route path="/signup" component={Signup} />
          <Route path="/join" component={JoinRoom} />
          <Route path="/create" component={CreateRoom} />
          <Route path="/room/:roomCode" component={Room} />
          <Route path="/create-lead" component={CreateLead} />
          <Route path="/leads" component={Leads} />
        </Switch>
      </div>
    </UserContext.Provider>
  );
};

const appDiv = document.getElementById("app");
render(
  <Router>
    <App />
  </Router>,
  appDiv
);
