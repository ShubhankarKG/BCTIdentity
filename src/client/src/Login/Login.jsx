import {
  Avatar, Button, Container, Grid, Paper, Typography
} from "@material-ui/core";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Navbar from "../CommonComponents/Navbar";

class Login extends Component {
  state = { stud: false, inst: false, we: false, s: false, i: false };
  exist = async () => {
    const { accounts, contract } = this.props;
    const response = await contract.methods
      .doesWalletExists(accounts[0])
      .call();
    console.log(response);
    if (response === true) {
      this.setState({ we: true });
    }
    console.log(this.state.we);
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
                      disabled={!this.state.we}
                      onClick={() => {
                        this.setState({ s: true });
                      }}
                    >
                      Login
                    </Button>
                    <Button
                      style={{ margin: "25px", color: "white" }}
                      disabled={this.state.we}
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        this.setState({ stud: true });
                      }}
                    >
                      Sign Up
                    </Button>{" "}
                  </Grid>
                </Paper>
              </div>
            </Grid>
          </Grid>
          {this.state.stud ? <Redirect to="/createstud" /> : null}
          {this.state.inst ? <Redirect to="/createinst" /> : null}
          {this.state.s ? <Redirect to="/StudentDashBoard" /> : null}
          {this.state.i ? <Redirect to="/InstituteDashBoard" /> : null}
        </Container>
      </div>
    );
  }
}

export default Login;
