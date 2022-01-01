import React, { useEffect, useRef, useState } from "react";
import {
  Grid,
  Card,
  Typography,
  Avatar,
  Button,
  ListItemAvatar,
} from "@material-ui/core";
import {
  Link,
} from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import FolderIcon from "@material-ui/icons/Folder";
import MyDocuments from "./MyDocuments";
import ChangeInst from "./ChangeInst";
import GiveAccessTo from "./GiveAccessTo";
import Navbar from "../CommonComponents/Navbar";

const StudentDashBoard = ({accounts, contract}) => {
  const [profilepic, setProfilepic] = useState("");
  const [name, setName] = useState("");
  const [owner1, setOwner1] = useState("");
  const [owner2, setOwner2] = useState("");
  const [counter, setCounter] = useState(0);
  const mounted = useRef(true);

  const fetchProfile = async () => {
    const response = await contract.methods.getOwners(accounts[0]).call();
    const response1 = await contract.methods.getProfile(accounts[0]).call();

    if (mounted.current) {
      setOwner1(response[0]);
      setOwner2(response[1]);
      setName(response1[0]);
      setProfilepic(response1[1]);
    }
  }

  useEffect(() => {
    fetchProfile();

    return () => {
      mounted.current = false;
    };
  }, [accounts, contract]);

  return (
    <Grid container justifyContent="flex-start">
      <Grid item md={12}>
        <Navbar/>
      </Grid>
      <Grid
        item
        md={2}
        style={{
          minHeight: "88vh",
          zIndex: "1"
        }}
      >
        <Card
          style={{
            width: "300px",
            height: "100%",
            paddingTop: "10px"
          }}
        >
          <Grid item md={12}>
            <Grid container>
              <Typography
                variant="h4"
                style={{
                  padding: "20px",
                  color: "#242424",
                  textAlign: "center"
                }}
              >
                My Profile
                <br />
              </Typography>
              <br />
              <Grid container>
                <Grid item md={1} />
                <Grid item md={12}>
                  <Avatar
                    style={{
                      width: 80,
                      height: 80,
                      marginLeft: "33.33%"
                    }}
                    src={profilepic ? `https://gateway.ipfs.io/ipfs/${
                      profilepic
                    }` : ""}
                  />
                  <br />
                </Grid>
                <Grid item md={2} />
                <Grid item md={8}>
                  <Typography
                    variant="h5"
                    style={{ textAlign: "center", color: "#242424", }}
                  >
                    {name}
                    <br />
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    style={{ textAlign: "center",color: "#242424" }}
                  >
                    My Address :<br />
                    {owner1.substring(0, 8) + ".."}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    style={{ textAlign: "center" ,color: "#242424"}}
                  >
                    Current Intitute/Organization :{" "}
                    {owner2.substring(0, 8) + ".."}
                  </Typography>
                </Grid>

                <Grid container justifyContent="center">
                  <br />
                  <Link
                    style={{ textDecoration: "none" ,color:"white" }}
                    to="/MyProfileStud"
                  >
                    <Button
                      variant="outlined"
                      color="secondary"
                      style={{  marginTop: "25px" ,backgroundColor:"black",color:"white"}}
                    >
                        View Profile
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            <br />
            <Grid container />
            <List style={{ textAlign: "center" }}>
              <ListItem
                button
                style={{ width: "300px", color: "#242424" }}
                onClick={() => setCounter(0)}
              >
                <ListItemAvatar>
                  <FolderIcon />
                </ListItemAvatar>
                <ListItemText>
                  <Typography variant="h6" style={{color:"#242424"}}>My Documents</Typography>
                </ListItemText>
              </ListItem>
              <ListItem
                button
                onClick={() => setCounter(1)}
                style={{ width: "300px", color: "#242424" }}
              >
                <ListItemAvatar>
                  <FolderIcon />
                </ListItemAvatar>
                <ListItemText>
                  <Typography variant="h6" style={{color:"#242424"}}>Give Access</Typography>
                </ListItemText>
              </ListItem>
              <ListItem
                button
                onClick={() => setCounter(2)}
                style={{ width: "300px", color: "#242424" }}
              >
                <ListItemAvatar>
                  <FolderIcon />
                </ListItemAvatar>
                <ListItemText>
                  <Typography variant="h6" style={{color:"#242424"}}>
                      Change Institute
                  </Typography>
                </ListItemText>
              </ListItem>
            </List>
          </Grid>
        </Card>
      </Grid>
      <Grid
        item
        md={7}
        style={{
          paddingTop: "70px"
        }}
      >
        {counter === 0 && <MyDocuments accounts={accounts} contract={contract}/>}
        {counter === 1 && <GiveAccessTo accounts={accounts} contract={contract}/>}
        {counter === 2 && <ChangeInst accounts={accounts} contract={contract}/>}
        
      </Grid>
    </Grid>
  )
}

export default StudentDashBoard;
