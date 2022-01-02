import React, { useEffect, useRef, useState } from "react";
import {
  Grid,
  Card,
  Typography,
  Avatar,
  Button,
  ListItemAvatar
} from "@material-ui/core";
import {
  Link,
} from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import FolderIcon from "@material-ui/icons/Folder";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ApproveUpload from "./ApproveUpload";
import LinkedAccount from "./LinkedAccounts";
import Navbar from "../CommonComponents/Navbar";

const InstituteDashBoard = ({ accounts, contract }) => {
  const [name, setName] = useState("");
  const [profilepic, setProfilepic] = useState("");
  const [counter, setCounter] = useState(0);
  const mounted = useRef(true);

  useEffect(() => {
    (async () => {
      if (contract && accounts) {
        const response1 = await contract.methods.getProfile(accounts[0]).call();

        if (mounted.current) {
          setName(response1[0]);
          setProfilepic(response1[1]);
        }
      }
    })();

    return () => {
      mounted.current = false;
    };
  }, [accounts, contract]);

  return (
    <Grid container>
      <Grid item md={12}>
        <Navbar />
      </Grid>
      <Grid
        item
        md={2}
        style={{
          zIndex: "1"
        }}
      >
        <Card style={{ width: "300px", height: "90vh" }}>
          <Grid item md={12}>
            <Grid container>
              <Typography
                variant="h4"
                style={{ padding: "20px", color: "#242424" }}
              >
                Institute Profile
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
                    src={`https://gateway.ipfs.io/ipfs/${profilepic}`}
                  />
                  <br />
                </Grid>
                <Grid item md={2} />
                <Grid item md={8}>
                  <Typography
                    variant="h5"
                    style={{ textAlign: "center" }}
                  >
                    {name}
                    <br />
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    style={{ textAlign: "center" }}
                  >
                    My Address : <br />
                    {accounts
                      ? accounts[0].substring(0, 8) + "..."
                      : "MetaMask not initialized yet..."}
                  </Typography>
                </Grid>
                <Grid container justifyContent="center">
                  <br />
                  <Link to="/MyProfileInst" style={{ textDecoration: "none", color: "white" }}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      style={{
                        marginTop: "25px",
                        backgroundColor: "black",
                        color: "white"
                      }}
                    >
                      View Profile
                    </Button>
                  </Link>
                </Grid>
                <Grid
                  container
                  justifyContent="center"
                  style={{ margin: "5%" }}
                >
                </Grid>
              </Grid>
            </Grid>
            <Grid container />
            {/* <hr /> */}
            <List style={{ textAlign: "center" }}>
              <ListItem
                button
                onClick={() => setCounter(0)}
                style={{ width: "300px", color: "#242424" }}
              >
                <ListItemAvatar>
                  <FolderIcon />
                </ListItemAvatar>
                <ListItemText>
                  <Typography variant="h6">
                    <Link
                      to="/InstituteDashBoard/LinkedAccounts"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Linked Accounts
                    </Link>
                  </Typography>
                </ListItemText>
              </ListItem>
              <ListItem
                button
                style={{ width: "300px", color: "#242424" }}
                onClick={() => setCounter(1)}
              >
                <ListItemAvatar>
                  <AssignmentIcon />
                </ListItemAvatar>
                <ListItemText>
                  <Link
                    to="/InstituteDashBoard/UploadApp"
                    style={{ textDecoration: "none" }}
                  >
                    <Typography variant="h6" style={{ color: "#242424" }}>
                      Pending Approvals
                    </Typography>
                  </Link>
                </ListItemText>
              </ListItem>
            </List>
          </Grid>
        </Card>
      </Grid>

      <Grid
        item
        md={5}
        style={{
          padding: "15px"
        }}
      >
        {counter === 0 ? (
          <LinkedAccount accounts={accounts} contract={contract} />
        ) : (
          <ApproveUpload accounts={accounts} contract={contract} />
        )}
      </Grid>
      <Grid
        item
        md={3}
        style={{
          padding: "15px"
        }}
      />
    </Grid>
  );
};

export default InstituteDashBoard;
