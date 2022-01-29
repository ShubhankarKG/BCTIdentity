import { Button, Container, Grid, Paper, styled, TextField, Typography } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { Redirect } from "react-router-dom";
import ipfs from "../ipfs";

const UpdateProfile = ({ accounts, contract, student }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilepic, setProfilepic] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [open, setOpen] = useState(true);

  const updateProfile = useCallback(async () => {
    await contract.methods
      .updateProf(name, profilepic, accounts[0], phoneno, email)
      .send({ from: accounts[0] });

    if (student) {
      localStorage.setItem(accounts[0], "student");
    } else {
      localStorage.setItem(accounts[0], "institute");
    }
    setOpen(false);
  }, [name, profilepic, accounts, phoneno, email, contract, student]);

  const addToIpfs = useCallback(async (a) => {
    await ipfs.add(a, (err, ipfsHash) => {
      console.log(err);
      setProfilepic(ipfsHash[0].hash);
    });
  }, []);

  const captureFile = useCallback(
    (event) => {
      event.preventDefault();
      const file = event.target.files[0];
      console.log(event.target.files);
      const reader = new window.FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = () => {
        addToIpfs(Buffer(reader.result));
      };
    },
    [addToIpfs]
  );

  const Input = styled("input")({
    display: "none"
  });

  return (
    <Container maxWidth="sm" style={{ height: "100vh" }}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ height: "100%" }}
      >
        <Paper style={{ padding: 32 }}>
          <Typography style={{ color: "#1a237e" }} variant="h4">
            Create New Account
          </Typography>
          {/* <Typography>Enter your Name</Typography> */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <br />
          {/* <Typography>Enter your Email</Typography> */}
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
          {/* <Typography>Enter your Phone Number</Typography> */}
          <TextField
            margin="dense"
            id="phoneno"
            label="Phone"
            type="text"
            fullWidth
            value={phoneno}
            onChange={(e) => setPhoneno(e.target.value)}
          />
          <br />
          <br />
          <Typography style={{ marginTop: "15px" }}>
            Upload a picture
          </Typography>
          <Grid container justifyContent="center">
            {profilepic && (
              <img
                src={`https://gateway.ipfs.io/ipfs/${profilepic}`}
                alt="Your Profile Pic Here"
                style={{ margin: "20px", height: "100px", width: "100px" }}
              />
            )}
          </Grid>
          <Grid container direction="row" justifyContent="space-between">
            <label htmlFor="upload-photo">
              <Input
                accept="image/*"
                onChange={(e) => captureFile(e)}
                type="file"
                id="upload-photo"
                hidden
              />
              <Button variant="contained" color="primary" component="span">
                Upload
              </Button>
            </label>
            <Button onClick={() => updateProfile()} color="primary">
              Create
            </Button>
          </Grid>
          {open ? null : student === true ? (
            <Redirect to="/CreateStudMultisig" />
          ) : (
            <Redirect to="/CreateInstMultisig" />
          )}
        </Paper>
      </Grid>
    </Container>
  );
};

export default UpdateProfile;
