import React, { useEffect, useRef, useState } from "react";
import {
  Grid,
  Card,
  Typography,
  Avatar,
  Button,
  ListItemAvatar,
  Box,
  AppBar,
  Toolbar,
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck } from "@fortawesome/free-solid-svg-icons";

const StudentDashBoard = ({ accounts, contract }) => {
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
    <Grid container justifyContent="center">
      <Grid item md={12}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" style={{ backgroundColor: '#242424' }}>
            <Toolbar>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                <div style={{ display: "flex" }}>
                  <FontAwesomeIcon icon={faUserCheck} style={{ margin: "auto 0" }} />
                  <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                      &nbsp;&nbsp;BCTIdentity
                    </Typography>
                  </Link>
                </div>
              </div>
              <Link to="/MyProfileStud" style={{ textDecoration: "none", color: "white" }}>
                <Avatar
                  style={{
                    width: 40,
                    height: 40,
                    marginLeft: "33.33%"
                  }}
                  src={`https://gateway.ipfs.io/ipfs/${profilepic}`}
                />
              </Link>
            </Toolbar>
          </AppBar>
        </Box>
      </Grid>
      <MyDocuments accounts={accounts} contract={contract} />
    </Grid>
  )
}

export default StudentDashBoard;
