import React, { useState, useContext } from "react";
import { Grid, Button, TextField, Typography } from "@material-ui/core";
import UserContext from "../../contexts/UserContext";

const Login = (props) => {
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });

  const { token, setToken } = useContext(UserContext);

  const handleLogin = () => {
    const { username, password } = loginInfo;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };
    fetch("/accounts/auth/token/login", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("token", data.auth_token);
        setToken(data.auth_token);
        console.log(data);
        props.history.push("/home");
      });
  };

  const handleChange = (e) => {
    setLoginInfo((previousValues) => ({
      ...previousValues,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Grid container spacing={2} align="center">
      <Grid item xs={12}>
        <Typography variant="h4" component="h4">
          Login
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="username"
          label="Username"
          variant="outlined"
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="password"
          label="Password"
          variant="outlined"
          type="password"
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
      </Grid>
    </Grid>
  );
};

export default Login;
