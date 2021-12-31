import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Grid, Typography, Avatar, Container, Paper,Card } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Navbar from "../CommonComponents/Navbar";

class Login extends Component {
  state = { stud: false, inst: false, we: false, s: false, i: false };
  exist = async () => {
    const { accounts, contract } = this.props;
    const response = await contract.methods
      .doesWalletExists(accounts[0])
      .call();
    console.log(response);
    if (response == true) {
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

      <Navbar/>
      <Card elevation={5} style={{
            margin:"100px auto",
            width:"70%",
            padding:"2%"
          }}>
      <Container maxWidth="lg">
        
          <Grid container justifyContent="center">
            <Grid item md={4} sm={12}>
              <div
              >
                <Paper
                  elevation={4}
                  style={{
                    backgroundColor: "white",
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
                      style={{ margin: "25px", color:"white"}}
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
                      style={{ margin: "25px", color:"white"}}
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
            <Grid item md={4} sm={false} />
            <Grid item md={4} sm={12}>
              <div>
                <Paper
                elevation={4}
                  style={{
                    backgroundColor: "#e3f2fd"
                  }}
                >
                  <Typography
                    variant="h4"
                    style={{ textAlign: "center", padding: "25px" }}
                  >
                    Institute
                  </Typography>
                  <Grid container justifyContent="center">
                    <Avatar style={{ width: "200px", height: "200px" }}>
                      <img
                        src="data:image/png;base64,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"
                        alt="Student2"
                        style={{width: "100%", height: "100%"}}
                      />
                    </Avatar>
                  </Grid>
                  <Grid container justifyContent="center">
                    <Button
                      style={{ margin: "25px", color:"white"}}
                      variant="contained"
                      color="secondary"
                      disabled={!this.state.we}
                      onClick={() => {
                        this.setState({ i: true });
                      }}
                    >
                      Login
                    </Button>
                    <Button
                    style={{ margin: "25px", color:"white"}}
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        this.setState({ inst: true });
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
      </Card>
      </div>
    );
  }
}

export default Login;
