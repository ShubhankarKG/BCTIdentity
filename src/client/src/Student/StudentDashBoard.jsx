import React, { Component } from "react";
import {
  Grid,
  Card,
  Typography,
  Avatar,
  Button,
  ListItemAvatar,
} from "@material-ui/core";
import {
  Route,
  Link,
  Switch,
  BrowserRouter,
} from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import FolderIcon from "@material-ui/icons/Folder";
import MyDocuments from "./MyDocuments";
import PendingApproval from "./PendingApproval";
import MyRequest from "./MyRequest";
import ChangeInst from "./ChangeInst";
import ApproveChnageInst from "./ApproveChangeInst";
import ApproveAccessReq from "./ApproveAccessReq";
import GiveAccessTo from "./GiveAccessTo";
import FreeAccess from "./FreeAccess";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PastHistory from "./PastHistory";
import Navbar from "../CommonComponents/Navbar";

class StudentDashBoard extends Component {
  state = {
    open: false,
    profilepic: "",
    name: "",
    owner1: "",
    owner2: "",
    aadhar: ""
  };
  profile = async () => {
    const { accounts, contract } = this.props;
    const response = await contract.methods.getOwners(accounts[0]).call();

    this.setState({ owner1: response[0] });
    this.setState({ owner2: response[1] });
    // console.log("owner:Institute:" + response[1]);
    // console.log("owner:Student:" + response[0]);
    const response1 = await contract.methods.getProfile(accounts[0]).call();
    this.setState({ name: response1[0] });
    this.setState({ profilepic: response1[1] });
    const response3 = await contract.methods.getAadhar(accounts[0]).call();
    this.setState({ aadhar: response3 });
    console.log(response3);
    // const response2 = await contract.methods
    //   .getUploadReqList(accounts[0])
    //   .call();

    // this.setState({ lis: response2 });

    // const response3 = await contract.methods.getAadhar().call();

    // this.setState({ aadhar: response3 });

    // console.log("aa", response3);
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  showDocs() {
    return <div>logic</div>;
  }
  componentDidMount = async () => {
    await this.profile();
  };

  render() {
    return (
      <BrowserRouter>
        <div>
          <div>
            <Grid container justifyContent="flex-start">
              <Grid item md={12}>
               <Navbar/>
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
                            src={`https://gateway.ipfs.io/ipfs/${
                              this.state.profilepic
                            }`}
                          />
                          <br />
                        </Grid>
                        <Grid item md={2} />
                        <Grid item md={8}>
                          <Typography
                            variant="h5"
                            style={{ textAlign: "center", color: "#242424", }}
                          >
                            {this.state.name}
                            <br />
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            style={{ textAlign: "center",color: "#242424" }}
                          >
                            My Address :<br />
                            {this.state.owner1.substring(0, 8) + ".."}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            style={{ textAlign: "center" ,color: "#242424"}}
                          >
                            Current Intitute/Organization :{" "}
                            {this.state.owner2.substring(0, 8) + ".."}
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
                    {/* <hr />  */}
                    <Grid container />
                    {/* <hr /> */}
                    <List style={{ textAlign: "center" }}>
                      <ListItem
                        button
                        onClick={this.showDocs.bind(this)}
                        style={{ width: "300px", color: "#242424" }}
                      >
                        <ListItemAvatar>
                          <FolderIcon />
                        </ListItemAvatar>
                        <ListItemText>
                          <Link style={{ textDecoration: "none" }} to="/mydocs">
                            <Typography variant="h6" style={{color:"#242424"}}>My Documents</Typography>
                          </Link>
                        </ListItemText>
                      </ListItem>
                      {/* <ListItem
                        button
                        style={{ width: "300px", color: "#3F51B5" }}
                      >
                        <ListItemAvatar>
                          <MailIcon />
                        </ListItemAvatar>
                        <ListItemText>
                          <Link style={{ textDecoration: "none" }} to="/myreqs">
                            <Typography variant="h6">My Requests</Typography>
                          </Link>
                        </ListItemText>
                      </ListItem> */}
                      {/* <ListItem
                        button
                        style={{ width: "300px", color: "#3F51B5" }}
                      >
                        <ListItemAvatar>
                          <FolderIcon />
                        </ListItemAvatar>
                        <ListItemText>
                          <Link
                            style={{ textDecoration: "none" }}
                            to="/pendapp"
                          >
                            <Typography variant="h6">
                              Pending Approvals
                            </Typography>
                          </Link>
                        </ListItemText>
                      </ListItem> */}

                      {/* <ListItem
                        button
                        style={{ width: "300px", color: "#3F51B5" }}
                      >
                        <ListItemAvatar>
                          <FolderIcon />
                        </ListItemAvatar>
                        <ListItemText>
                          <Link
                            style={{ textDecoration: "none" }}
                            to="/approvechnageininst"
                          >
                            <Typography variant="h6">
                              Approve Institute Change
                            </Typography>
                          </Link>
                        </ListItemText>
                      </ListItem> */}
                      {/* <ListItem
                        button
                        style={{ width: "300px", color: "#3F51B5" }}
                      >
                        <ListItemAvatar>
                          <FolderIcon />
                        </ListItemAvatar>
                        <ListItemText>
                          <Link
                            style={{ textDecoration: "none" }}
                            to="/approveaccessreq"
                          >
                            <Typography variant="h6">
                              Approve Access Requests
                            </Typography>
                          </Link>
                        </ListItemText>
                      </ListItem> */}
                      <ListItem
                        button
                        style={{ width: "300px", color: "#242424" }}
                      >
                        <ListItemAvatar>
                          <FolderIcon />
                        </ListItemAvatar>
                        <ListItemText>
                          <Link
                            style={{ textDecoration: "none" }}
                            to="/giveaccess"
                          >
                            <Typography variant="h6" style={{color:"#242424"}}>Give Access</Typography>
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
                            to="/FreeAccess"
                            style={{ textDecoration: "none" }}
                          >
                            <Typography variant="h6" style={{color:"#242424"}}>Free Access</Typography>
                          </Link>
                        </ListItemText>
                      </ListItem>
                      <ListItem
                        button
                        style={{ width: "300px", color: "#242424" }}
                      >
                        <ListItemAvatar>
                          <FolderIcon />
                        </ListItemAvatar>
                        <ListItemText>
                          <Link style={{ textDecoration: "none" }} to="/chinst">
                            <Typography variant="h6" style={{color:"#242424"}}>
                              Change Institute
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
                            to="/pasthistory"
                            style={{ textDecoration: "none" }}
                          >
                            <Typography variant="h6">Past History</Typography>
                          </Link>
                        </ListItemText>
                      </ListItem> */}
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
                <Switch>
                  <Route
                    path="/pendapp"
                    component={() => (
                      <PendingApproval
                        accounts={this.props.accounts}
                        contract={this.props.contract}
                      />
                    )}
                  />
                  <Route
                    path="/approveaccessreq"
                    component={() => (
                      <ApproveAccessReq
                        accounts={this.props.accounts}
                        contract={this.props.contract}
                      />
                    )}
                  />
                  <Route
                    path="/FreeAccess"
                    component={() => (
                      <FreeAccess
                        accounts={this.props.accounts}
                        contract={this.props.contract}
                      />
                    )}
                  />
                  <Route
                    path="/giveaccess"
                    component={() => (
                      <GiveAccessTo
                        accounts={this.props.accounts}
                        contract={this.props.contract}
                      />
                    )}
                  />
                  <Route
                    path="/approvechnageininst"
                    component={() => (
                      <ApproveChnageInst
                        accounts={this.props.accounts}
                        contract={this.props.contract}
                      />
                    )}
                  />
                  <Route
                    path="/myreqs"
                    component={() => (
                      <MyRequest
                        accounts={this.props.accounts}
                        contract={this.props.contract}
                      />
                    )}
                  />
                  <Route
                    path="/pasthistory"
                    component={() => (
                      <PastHistory
                        accounts={this.props.accounts}
                        contract={this.props.contract}
                      />
                    )}
                  />
                  <Route
                    path="/chinst"
                    component={() => (
                      <ChangeInst
                        accounts={this.props.accounts}
                        contract={this.props.contract}
                      />
                    )}
                  />

                  <Route
                    path="/mydocs"
                    component={() => (
                      <MyDocuments
                        accounts={this.props.accounts}
                        contract={this.props.contract}
                      />
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
              >
                <Card style={{ margin: "15px" }}>
                  <Typography
                    variant="h4"
                    style={{ padding: "10px", color: "#2f2f2f" }}
                  >
                    Notifications
                    <Typography variant="caption" style={{ marginLeft: "5px" }}>
                      (Click on the Notification to view.)
                    </Typography>
                  </Typography>
                  <List>
                    {/* {this.props.student.notifications.map(notifications => {
                    return (
                      <div>
                        <ListItem button>
                          <ListItemText>
                            <Typography variant="title">
                              {notifications.institute} : Request to view{" "}
                              {notifications.docname}
                            </Typography>
                          </ListItemText>
                        </ListItem>
                        <Divider />
                      </div>
                    );
                  })} */}
                  </List>
                </Card>
              </Grid>
            </Grid>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default StudentDashBoard;
