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
    <Grid container justifyContent="centre">
      <Grid item md={12}>
        <Navbar/>
      </Grid>
      <Card style={{
                marginTop: "30px",
                marginLeft: "250px",
                marginRight: "50px",
                width: "900px"
              }}>
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
          <Grid item md={4}>
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
          <Grid item md={8}>
            <Typography
              variant="h5"
              style={{ color: "#242424", }}
            >
              {name}
              <br />
            </Typography>
            <Typography
              variant="subtitle2"
              style={{ color: "#242424" }}
            >
              My Address :<br />
              {owner1}
            </Typography>
            <Typography
              variant="subtitle2"
              style={{ color: "#242424"}}
            >
              Current Intitute/Organization :{" "}
              {owner2}
            </Typography>
          </Grid>

          <Grid container justifyContent="center" style={{padding: "10px"}}>
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
      </Card>
        <MyDocuments accounts={accounts} contract={contract}/>
    </Grid>
  )
}

export default StudentDashBoard;
