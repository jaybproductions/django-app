import React, { useState } from "react";
import { Grid, Button, TextField, Typography } from "@material-ui/core";

const Signup = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleSignUp = () => {
    const { email, username, password } = loginInfo;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        username: username,
      }),
    };

    fetch("/accounts/auth/users/", requestOptions).then((response) => {
      if (response.ok) {
        console.log(response);
      } else {
        console.log(response);
      }
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
          Sign Up
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
          name="email"
          label="Email"
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
        <Button variant="contained" color="primary" onClick={handleSignUp}>
          Sign Up
        </Button>
      </Grid>
    </Grid>
  );
};

export default Signup;
