import React, { useContext, useEffect, useState } from "react";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";
const Home = () => {
  const { token } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    if (token) {
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      };

      fetch("/accounts/auth/users/me/", requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setUserInfo(data);
        });
    } else {
      return false;
    }
  }, [token]);

  return (
    <Grid container spacing={3} align="center">
      <Grid item xs={12}>
        <Typography variant="h3" compact="h3">
          Hello, {userInfo.username}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <ButtonGroup disableElevation variant="contained" color="primary">
          <Button color="primary" to="/join" component={Link}>
            Join a Room
          </Button>
          <Button color="secondary" to="/create" component={Link}>
            Create a Room
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default Home;
