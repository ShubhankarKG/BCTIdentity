import React, { Component, useEffect, useRef, useState } from "react";
import { Grid, Typography, Avatar, Card, Button } from "@material-ui/core";
import green from "@material-ui/core/colors/green";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider
} from "@material-ui/core";

import ipfs from "../ipfs";

const LinkedAccount = ({accounts, contract}) => {
  const [linkedAccounts, setLinkedAccounts] = useState([{}]);
  const [currentState, setCurrentState] = useState({
    a: "",
    b: "",
    name: "",
    pic: ""
  });
  const [newinstadd, setNewinstadd] = useState("");
  const [hasAadhar, setHasAadhar] = useState(false);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [profilepic, setProfilepic] = useState("");
  const [loading, setLoading] = useState(true);
  const mounted = useRef(true);

  const verify = async () => {
    const allLinkedAccounts = await contract.methods.getInstitutesWallet(accounts[0]).call();
    const result = [];

    await Promise.all([...new Set(allLinkedAccounts)].map(async studentAccount => {
      const assa = await contract.methods.getChangeOwnerList(studentAccount).call();
      const getDet = await contract.methods.getProfile(studentAccount).call();
      result.push({ a: studentAccount, b: assa[0], name: getDet[0], pic: getDet[1] });
    }));

    const result2 = await contract.methods.getAadhar(accounts[0]).call();
    
    if (mounted.current) {
      setLinkedAccounts(result)
      if (result2.length > 0) {
        setHasAadhar(true);
      }
      setLoading(false);
    };
  };

  useEffect(() => {
    verify();
    return () => {
      mounted.current = false;
    };
  }, []);

  const getDoc = async (address) => {
    var ipfsHash = await contract.methods.getAadhar(address).call();
    if (ipfsHash.length > 0) {
      window.open(`https://gateway.ipfs.io/ipfs/${ipfsHash}`);
    } else {
      window.alert("NULL");
    }
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  
  const handleClose1 = () => {
    handleClose();
    setOpen1(false);
  };

  const uploadToIpfs = async (file) => {
    await ipfs.add(file, (err, ipfsHash) => {
      if (err) {
        console.error(err);
        return;
      }
      setProfilepic(ipfsHash[0].hash);
    });
  };

  const captureFile = event => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      uploadToIpfs(Buffer(reader.result));
    };
  };

  const onCreate = async () => {
    try {
      await contract.methods
      .createUploadRequestbyInstitute(
        currentState.a,
        true,
        profilepic
      )
      .send({ from: accounts[0] });
      await contract.methods
        .getUploadReqList(currentState.a)
        .call();
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const changeinst = async () => {
    try {
      await contract.methods
        .changeOwnerInstfromInst(currentState.a, newinstadd)
        .send({ from: accounts[0] });
      await contract.methods
        .getChangeOwnerList(currentState.a)
        .call();

      await contract.methods
        .getOwners(currentState.a)
        .call();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
        style={{
          margin: "40px 100px"
        }}
      >
        <Typography variant="h4" style={{ padding: "20px", color: "#3F51B5" }}>
          Students
          <br />
        </Typography>

        {!loading && linkedAccounts.map((account, index) => {
          return (
            <div key={index}>
              <div>
                <Grid container>
                  <Grid
                    item
                    md={8}
                    style={{ width: "400px", paddingTop: "20px" }}
                  >
                    <Card style={{ width: "900px" }}>
                      <Grid container style={{ padding: "20px" }}>
                        <Grid container>
                          <Grid item md={2} style={{ marginLeft: "25px" }}>
                            <Avatar
                              style={{
                                color: "#fff",
                                backgroundColor: green[500],
                                width: "75px",
                                height: "75px"
                              }}
                              src={`https://gateway.ipfs.io/ipfs/${account.pic}`}
                            />
                          </Grid>

                          <Grid item md={4}>
                            <Typography variant="body1">
                              {account.name}
                            </Typography>
                            <Typography variant="overline">
                              ADDRESS : {account.a}
                            </Typography>

                            <br />
                          </Grid>
                          <Grid item md={1}>
                            <br />
                            <Button
                              onClick={() => {
                                setOpen(!open);
                                setCurrentState(account);
                              }}
                              variant="outlined"
                            >
                              View
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                </Grid>
              </div>

              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
              >
                <div style={{ marginLeft: "30px", marginRight: "30px" }}>
                  <DialogTitle id="form-dialog-title">
                    <Typography style={{ color: "#1a237e" }} variant="h4">
                      Profile
                    </Typography>
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText style={{ color: "black" }}>
                      <Typography variant="h5">
                        {" "}
                        Name : {currentState.name}
                      </Typography>
                      <Typography variant="overline">
                        ADDRESS : {currentState.a}
                      </Typography>
                    </DialogContentText>
                    <br />
                    <Grid container justifyContent="center">
                      <img
                        src={`https://gateway.ipfs.io/ipfs/${account.pic}`}
                        alt="CNN"
                        style={{
                          margin: "20px",
                          height: "200px",
                          width: "200px"
                        }}
                      />
                    </Grid>{" "}
                    <DialogContentText style={{ color: "black" }}>
                      Documents{" "}
                      <Typography variant="caption">
                        (Click to send View Request)
                      </Typography>
                    </DialogContentText>
                    <List style={{ width: "500px" }}>
                      <ListItem button>
                        <ListItemText>B.Tech Degree</ListItemText>
                        <Button>
                          <input onChange={captureFile} type="file" />
                        </Button>

                        <Button
                          onClick={() => getDoc(currentState.a)}
                          variant="outlined"
                        >
                          view
                        </Button>
                      </ListItem>
                      <Divider />
                    </List>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>

                    <Button onClick={onCreate} color="primary">
                      Create New Upload Request
                    </Button>
                  </DialogActions>
                </div>
              </Dialog>
              <Dialog
                open={open1}
                onClose={handleClose1}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">
                  <Typography style={{ color: "#1a237e" }} variant="h4">
                    Chnage Institute Of student
                  </Typography>
                </DialogTitle>
                <DialogContent>
                  <DialogContentText style={{ color: "black" }}>
                    <Typography variant="h5">
                      {" "}
                      Name : {currentState.name}
                    </Typography>
                    <Typography variant="overline">
                      ADDRESS : {currentState.a}
                    </Typography>
                    <Typography variant="h6">
                      Enter Address of new Institute
                    </Typography>
                  </DialogContentText>
                  <TextField
                    id="standard-with-placeholder"
                    label="Address*"
                    placeholder="Enter Address"
                    margin="normal"
                    style={{ width: "250px" }}
                    onChange={e => {
                      setNewinstadd(e.target.value);
                    }}
                  />{" "}
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose1} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={changeinst} color="primary">
                    Confirm
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          );
        })}
      </div>
  );
}

export default LinkedAccount;
