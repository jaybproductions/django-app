import React, { useState } from "react";
import { Grid, Button, TextField, Typography } from "@material-ui/core";

const CreateLead = () => {
  const [lead, setLead] = useState({
    firstName: "",
    lastName: "",
    email: "",
    businessName: "",
    phoneNumber: "",
  });

  const handleChange = (event) => {
    setLead((previousValues) => ({
      ...previousValues,
      [event.target.name]: event.target.value,
    }));
  };

  const handleAddLead = () => {
    const { firstName, lastName, email, phoneNumber, businessName } = lead;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone_number: phoneNumber,
        business_name: businessName,
      }),
    };
    fetch("/api/create-lead", requestOptions)
      .then((response) => {
        if (response.ok) {
          setLead({
            firstName: "",
            lastName: "",
            email: "",
            businessName: "",
            phoneNumber: "",
          });
          console.log("Lead has been added to db");
        } else {
          console.log("Lead was not added to db");
        }
      })
      .catch((error) => {
        console.log("There was an error.");
      });
  };
  return (
    <Grid container spacing={2} align="center">
      <Grid item xs={12}>
        <Typography variant="h4" component="h4">
          Create a New Lead
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="firstName"
          label="First Name"
          variant="outlined"
          value={lead.firstName}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="lastName"
          label="Last Name"
          variant="outlined"
          value={lead.lastName}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="phoneNumber"
          label="Phone Number"
          variant="outlined"
          value={lead.phoneNumber}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          value={lead.email}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="businessName"
          label="Business Name"
          variant="outlined"
          value={lead.businessName}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleAddLead}>
          Add Lead
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateLead;
