import React, { useEffect, useState } from "react";
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
const App = () => {
  const [roomCode, setRoomCode] = useState(null);
  useEffect(() => {
    fetch("/api/user-in-room")
      .then((response) => response.json())
      .then((data) => {
        setRoomCode(data.code);
      });
  }, []);
  return (
    <>
      <Header />
      <div className="center">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/join" component={JoinRoom} />
          <Route path="/create" component={CreateRoom} />
          <Route path="/room/:roomCode" component={Room} />
          <Route path="/create-lead" component={CreateLead} />
          <Route path="/leads" component={Leads} />
        </Switch>
      </div>
    </>
  );
};

const appDiv = document.getElementById("app");
render(
  <Router>
    <App />
  </Router>,
  appDiv
);
