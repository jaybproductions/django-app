import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";

//pages imports
import Home from "./Home";
import JoinRoom from "./JoinRoom";
import CreateRoom from "./CreateRoom";
import Room from "./Room";
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
    <div className="center">
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return roomCode ? <Redirect to={`/room/${roomCode}`} /> : Home;
            }}
          />
          <Route path="/join" component={JoinRoom} />
          <Route path="/create" component={CreateRoom} />
          <Route path="/room/:roomCode" component={Room} />
        </Switch>
      </Router>
    </div>
  );
};

const appDiv = document.getElementById("app");
render(<App />, appDiv);
