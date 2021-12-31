import React, { Component } from "react";
import { Grid, Typography, Avatar, Card } from "@material-ui/core";
import green from "@material-ui/core/colors/green";
import MailIcon from "@material-ui/icons/Mail";
import AlertDialog from "../CommonComponents/AlertDialog";

class MyRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Grid container>
          {/* <Grid item md={1} /> */}
          <Grid item md={6}>
            <Card
              style={{
                marginTop: "30px",
                marginLeft: "50px",
                marginRight: "50px",
                width: "1150px"
              }}
            >
              <Grid container>
                <Grid item md={1}>
                  <Avatar
                    style={{ margin: "15px", backgroundColor: "#E10050 " }}
                  >
                    <MailIcon />
                  </Avatar>
                </Grid>
                <Grid item md={10}>
                  <Typography
                    variant="h4"
                    style={{
                      padding: "10px",
                      marginLeft: "15px",
                      color: "#E10050"
                    }}
                  >
                    Transfer of Ownership Requests
                    <Typography variant="caption" style={{ marginLeft: "5px" }}>
                      (Click on the Request to view.)
                    </Typography>
                  </Typography>
                  <hr />
                </Grid>

                {/* array map ExpPanel.jsx */}
                <Grid container>
                  <Grid item md={2} style={{ marginLeft: "25px" }}>
                    <Avatar
                      style={{
                        color: "#fff",
                        backgroundColor: green[500]
                      }}
                    >
                      <MailIcon />
                    </Avatar>
                  </Grid>

                  <Grid item md={6}>
                    <Typography>
                      Request to view{" "}
                      <em style={{ color: "red" }}>Class X marksheet </em> was
                      sent on <em>26/1/2015</em> by <em>CPSKR</em>. <br />
                      Requester Address : <em>8855DDX84844</em>
                    </Typography>
                    <br />
                  </Grid>
                  <Grid item md={1} />
                  <Grid item md={1}>
                    <AlertDialog /> {/* array map the alert dialog  */}
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default MyRequest;
