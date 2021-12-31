import React, { useCallback, useState } from "react";
import { Grid, Button, Container } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import ipfs from "../ipfs";
import { Redirect } from "react-router-dom";

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

    const response = await contract.methods.getProfile(accounts[0]).call();
    console.log(response[0] + "updated");
    setOpen(false);
  }, [name, profilepic, accounts, phoneno, email, contract]);
  
  const addToIpfs = useCallback(async (a) => {
    await ipfs.add(a, (err, ipfsHash) => {
      console.log(err);
      setProfilepic(ipfsHash[0].hash);
    });
  }, []);
  
  const captureFile = useCallback((event) => {
    event.preventDefault();
    const file = event.target.files[0];
    console.log(event.target.files);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      addToIpfs(Buffer(reader.result));
    };
  }, [addToIpfs]);


  return (
    <Container maxWidth="sm">
      <Typography style={{ color: "#1a237e" }} variant="h4">
        Create New Account
      </Typography>
      <Typography>Enter your Name</Typography>
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
      <Typography>Enter your Email</Typography>
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
      <Typography>Enter your Phone Number</Typography>
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
      <Typography style={{ marginTop: "15px" }}>Upload a picture</Typography>
      <Grid container justifyContent="center">
        {profilepic && (
          <img
            src={`https://gateway.ipfs.io/ipfs/${profilepic}`}
            alt="Your Profile Pic Here"
            style={{ margin: "20px", height: "250px", width: "250px" }}
          />
        )}
      </Grid>
      <Button>
        Browse <input onChange={(e) => captureFile(e)} type="file" />{" "}
      </Button>
      <Button onClick={() => updateProfile()} color="primary">
        Create
      </Button>
      {open ? null : (student === true ? <Redirect to="/CreateStudMultisig"/> : <Redirect to="/CreateInstMultisig" />)}
    </Container>
  );
};

export default UpdateProfile;
