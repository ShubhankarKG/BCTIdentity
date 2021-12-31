import React, { Component, useEffect, useRef, useState } from "react";
import {
  Grid,
  Card,
  Typography,
  Avatar,
  Button,
  ListItemAvatar,
  Drawer
} from "@material-ui/core";
import {
  Route,
  Link,
  Switch,
  BrowserRouter,
  Wrapper,
  PageWrap
} from "react-router-dom";
// import ListDividers from "../CommonComponents/ListDividers";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
// import FullScreenDialog from "../CommonComponents/FullScreenDialog";
import TopNav from "../Student/TopNav";
import FolderIcon from "@material-ui/icons/Folder";
import MailIcon from "@material-ui/icons/Mail";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ChangeOwnershipApprovalbyInst from "./ChangeOwnershipApprovalbyInst";
import ApproveUpload from "./ApproveUpload";
import DrawerRHS from "../CommonComponents/DrawerRHS";
import LinkedAccount from "./LinkedAccounts";
import RequestAccess from "./RequestAccess";
import Access from "./Access";
import OtpAccess from "./OtpAccess";
import Navbar from "../CommonComponents/Navbar";

const InstituteDashBoard = ({ accounts, contract }) => {
  const [owner1, setOwner1] = useState("");
  const [owner2, setOwner2] = useState("");
  const [name, setName] = useState("");
  const [profilepic, setProfilepic] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [open, setOpen] = useState(false);

  const mounted = useRef(true);

  useEffect(() => {
    (async () => {
      if (contract && accounts) {
        const response = await contract.methods.getOwners(accounts[0]).call();
        const response1 = await contract.methods.getProfile(accounts[0]).call();
        const response2 = await contract.methods.getAadhar(accounts[0]).call();

        if (mounted.current) {
          setOwner1(response[0]);
          setOwner2(response[1]);
          setName(response1[0]);
          setProfilepic(response1[1]);
          setAadhar(response2);
        }
      }
    })();

    return () => {
      mounted.current = false;
    };
  }, [accounts, contract]);

  const showDocs = () => {
    return <div>logic</div>;
  };

  return (
    <BrowserRouter>
      <div>
        <div>
          <Grid container>
            <Grid item md={12}>
              <Navbar />
            </Grid>
            {/* <Grid item md={12} style={{ padding: "40px" }}>
                {" "}
              </Grid> */}
            <Grid
              item
              md={2}
              style={{
                height: "100vh",
                zIndex: "1"
              }}
            >
              <Card style={{ width: "300px", height: "1000px" }}>
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
                        {/* <Typography
                          variant="subtitle2"
                          style={{ textAlign: "center" }}
                        >
                          Current Intitute/Organization :
                          {this.state.owner2.substring(0, 8) + ".."}
                        </Typography> */}
                      </Grid>
                      <Grid container justifyContent="center">
                        <br />
                        <Button
                          variant="outlined"
                          color="secondary"
                          style={{
                            marginTop: "25px",
                            backgroundColor: "black",
                            color: "white"
                          }}
                        >
                          <a
                            href="/MyProfileInst"
                            style={{ textDecoration: "none", color: "white" }}
                          >
                            View Profile
                          </a>
                        </Button>
                      </Grid>
                      <Grid
                        container
                        justifyContent="center"
                        style={{ margin: "5%" }}
                      >
                        {/* <DrawerRHS
                            accounts={this.props.accounts}
                            contract={this.props.contract}
                          /> */}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container />
                  {/* <hr /> */}
                  <List style={{ textAlign: "center" }}>
                    <ListItem
                      button
                      onClick={showDocs}
                      style={{ width: "300px", color: "#242424" }}
                    >
                      <ListItemAvatar>
                        <FolderIcon />
                      </ListItemAvatar>
                      <ListItemText>
                        <Typography variant="h6">
                          <Link
                            to="/InstituteDashBoard/k"
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            Linked Accounts
                          </Link>
                        </Typography>
                      </ListItemText>
                    </ListItem>

                    {/* <ListItem
                        button
                        onClick={this.showDocs.bind(this)}
                        style={{ width: "300px", color: "#3F51B5" }}
                      >
                        <ListItemAvatar>
                          <FolderIcon />
                        </ListItemAvatar>
                        <ListItemText>
                          <Typography variant="h6">Upload Documents</Typography>
                        </ListItemText>
                      </ListItem> */}
                    {/* <ListItem
                        button
                        style={{ width: "300px", color: "#3F51B5" }}
                      >
                        <ListItemAvatar>
                          <MailIcon />
                        </ListItemAvatar>
                        <ListItemText>
                          <Typography variant="h6">My Requests</Typography>
                        </ListItemText>
                      </ListItem> */}
                    <ListItem
                      button
                      onClick={showDocs}
                      style={{ width: "300px", color: "#242424" }}
                    >
                      <ListItemAvatar>
                        <FolderIcon />
                      </ListItemAvatar>
                      <ListItemText>
                        <Typography variant="h6" style={{ color: "#242424" }}>
                          <Link
                            to="/InstituteDashBoard/acc"
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            Access Rights
                          </Link>
                        </Typography>
                      </ListItemText>
                    </ListItem>

                    <ListItem
                      button
                      style={{ width: "300px", color: "#242424" }}
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
                    <ListItem
                      button
                      style={{ width: "300px", color: "#242424" }}
                    >
                      <ListItemAvatar>
                        <AssignmentIcon />
                      </ListItemAvatar>
                      <ListItemText>
                        <Link
                          to="/InstituteDashBoard/ChangeOwnershipApprovalbyInst"
                          style={{ textDecoration: "none" }}
                        >
                          <Typography variant="h6" style={{ color: "#2f2f2f" }}>
                            Change Institute Approvals
                          </Typography>
                        </Link>
                      </ListItemText>
                    </ListItem>

                    {/* <ListItem
                        button
                        style={{ width: "300px", color: "#3F51B5" }}
                      >
                        <ListItemAvatar>
                          <AssignmentIcon />
                        </ListItemAvatar>
                        <ListItemText>
                          <Link
                            to="/InstituteDashBoard/OtpAccess"
                            style={{ textDecoration: "none" }}
                          >
                            <Typography variant="h6">Otp Access</Typography>
                          </Link>
                        </ListItemText>
                      </ListItem> */}
                    {/* <ListItem
                        button
                        style={{ width: "300px", color: "#3F51B5" }}
                      >
                        <ListItemAvatar>
                          <AssignmentIcon />
                        </ListItemAvatar>
                        <ListItemText>
                          <Link
                            to="/InstituteDashBoard/RequestAccess"
                            style={{ textDecoration: "none" }}
                          >
                            <Typography variant="h6">Request Access</Typography>
                          </Link>
                        </ListItemText>
                      </ListItem> */}

                    {/* <ListItem
                        button
                        onClick={this.showDocs.bind(this)}
                        style={{ width: "300px", color: "#3F51B5" }}
                      >
                        <ListItemAvatar>
                          <FolderIcon />
                        </ListItemAvatar>
                        <ListItemText>
                          <Typography variant="h6">
                            <Link
                              to="/InstituteDashBoard/ReqAccess"
                              style={{ textDecoration: "none", color: "black" }}
                            >
                              Request Access
                            </Link>
                          </Typography>
                        </ListItemText>
                      </ListItem> */}
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
              <Switch>
                <Route
                  path="/InstituteDashBoard/ChangeOwnershipApprovalbyInst"
                  component={() => (
                    <ChangeOwnershipApprovalbyInst
                      accounts={accounts}
                      contract={contract}
                    />
                  )}
                />

                <Route
                  path="/InstituteDashBoard/OtpAccess"
                  component={() => (
                    <OtpAccess accounts={accounts} contract={contract} />
                  )}
                />

                <Route
                  path="/InstituteDashBoard/k"
                  component={() => (
                    <LinkedAccount accounts={accounts} contract={contract} />
                  )}
                />
                <Route
                  path="/InstituteDashBoard/acc"
                  component={() => (
                    <Access accounts={accounts} contract={contract} />
                  )}
                />
                <Route
                  path="/InstituteDashBoard/UploadApp"
                  component={() => (
                    <ApproveUpload accounts={accounts} contract={contract} />
                  )}
                />

                <Route
                  path="/InstituteDashBoard/ReqAccess"
                  component={() => (
                    <RequestAccess accounts={accounts} contract={contract} />
                  )}
                />
              </Switch>
            </Grid>
            <Grid
              item
              md={3}
              style={{
                padding: "15px"
              }}
            />
          </Grid>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default InstituteDashBoard;
