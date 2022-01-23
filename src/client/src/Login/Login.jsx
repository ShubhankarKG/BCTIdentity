import {
  Avatar, Button, Container, Grid, Paper, Typography
} from "@material-ui/core";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Navbar from "../CommonComponents/Navbar";

class Login extends Component {
  state = {
    redirectToSignupForm: false,
    doesWalletExist: false,
    redirectToDashboard: false
  };

  exist = async () => {
    const { accounts, contract } = this.props;
    const response = await contract.methods
      .doesWalletExists(accounts[0])
      .call();
    if (response === true) {
      this.setState({ doesWalletExist: true });
    }
  };

  componentDidMount = async () => {
    await this.exist();
  };

  render() {
    return (
      <div>
        <Navbar />
        <Container maxWidth="lg" style={{ marginTop: 64 }}>
          <Grid container justifyContent="center">
            <Grid item md={4} sm={8}>
              <div>
                <Paper
                  elevation={4}
                  style={{
                    backgroundColor: "white"
                  }}
                >
                  <Typography
                    variant="h4"
                    style={{ textAlign: "center", padding: "25px" }}
                  >
                    Student
                  </Typography>
                  <Grid container justifyContent="center">
                    <Avatar style={{ width: "200px", height: "200px" }}>
                      <img
                        src="https://npcdcs.tn.gov.in/ncdmobile_admin/img/signin.png"
                        alt="student"
                        style={{ width: "100%", height: "100%" }}
                      />
                    </Avatar>
                  </Grid>
                  <Grid container justifyContent="center">
                    <Button
                      style={{ margin: "25px", color: "white" }}
                      variant="contained"
                      color="secondary"
                      disabled={!this.state.doesWalletExist}
                      onClick={() => {
                        this.setState({ redirectToDashboard: true });
                      }}
                    >
                      Login
                    </Button>
                    <Button
                      style={{ margin: "25px", color: "white" }}
                      disabled={this.state.doesWalletExist}
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        this.setState({ redirectToSignupForm: true });
                      }}
                    >
                      Sign Up
                    </Button>{" "}
                  </Grid>
                </Paper>
              </div>
            </Grid>
          </Grid>
          {this.state.redirectToSignupForm ? <Redirect to="/createstud" /> : null}
          {this.state.redirectToDashboard ? <Redirect to="/StudentDashBoard" /> : null}
        </Container>
      </div>
    );
  }
}

export default Login;
