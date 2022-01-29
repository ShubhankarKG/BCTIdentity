import { AppBar, Avatar, Button, Card, Grid, IconButton, List, Toolbar, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { ArrowBackSharp, Lock, Mail } from "@material-ui/icons";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { Redirect } from "react-router-dom";


const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: 20
  }
};

const MyProfile = ({ classes, accounts, contract }) => {
  const [owner2, setOwner2] = useState("");
  const [name, setName] = useState("");
  const [profilepic, setProfilepic] = useState("");
  const [instname, setInstname] = useState("");
  const [ret, setRet] = useState(false);

  const mounted = useRef(true);

  const getDoc = async () => {
    const response = await contract.methods.getAadhar(accounts[0]).call();
    if (response.length > 0) {
      window.open(`https://gateway.ipfs.io/ipfs/${response}`);
    } else {
      window.alert("NULL");
    }
  };

  useEffect(() => {

    const fetchProfile = async () => {
      const response = await contract.methods.getOwners(accounts[0]).call();
      const response1 = await contract.methods.getProfile(accounts[0]).call();
      const response2 = await contract.methods.getProfile(response[1]).call();

      if (mounted.current) {
        setOwner2(response[1]);
        setName(response1[0]);
        setProfilepic(response1[1]);
        setInstname(response2[0]);
      }
    }

    fetchProfile();

    return () => {
      mounted.current = false;
    };
  }, [accounts, contract]);

  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: "black" }}>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={() => setRet(true)}
          >
            <ArrowBackSharp />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            My Profile
          </Typography>

        </Toolbar>
      </AppBar>
      <Grid container>
        <Grid item md={1} />
        <Grid item md={10}>
          <Card
            className="shadow"
            style={{ marginTop: "20px", padding: "15px" }}
          >
            <Grid container>
              <Grid item md={2}>
                <Avatar
                  style={{ width: "85px", height: "85px" }}
                  src={!!profilepic ? `https://gateway.ipfs.io/ipfs/${profilepic}` : ""}
                />
              </Grid>
              <Grid item md={7}>
                <Typography variant="h5">{name}</Typography>
                <Typography variant="overline" style={{ fontSize: "15px" }}>
                  ADDRESS : {accounts[0]}
                </Typography>
                <br />
                <Typography variant="overline" style={{ fontSize: "15px" }}>
                  Current co-owner :{instname}
                  <br /> {owner2}
                </Typography>
              </Grid>
              <Grid item md={2} />
            </Grid>
          </Card>
          <Card
            className="shadow"
            style={{ marginTop: "20px", padding: "15px" }}
          >
            <Grid container>
              <Grid item md={1}>
                <Avatar
                  style={{ backgroundColor: "#242424", padding: "10px" }}
                >
                  <Mail />
                </Avatar>
              </Grid>
              <Grid item md={2}>
                <Typography variant="h5" style={{ padding: "10px" }}>
                  Documents
                </Typography>
                <List>
                  <Typography>
                    <Button onClick={getDoc}>
                      B.Tech Degree
                    </Button>
                  </Typography>
                </List>
              </Grid>
            </Grid>
          </Card>
          <Card
            className="shadow"
            style={{ marginTop: "20px", padding: "15px" }}
          >
            <Grid container>
              <Grid item md={1}>
                <Avatar
                  style={{ backgroundColor: "#242424", padding: "10px" }}
                >
                  <Lock />
                </Avatar>
              </Grid>
              <Grid item md={2}>
                <Typography variant="h5" style={{ padding: "10px" }}>
                  Co-owner
                </Typography>{" "}
              </Grid>
              <br />
              <Grid item md={7}>
                {" "}
                <Typography variant="h5">{instname}</Typography>{" "}
                <Typography variant="overline">
                  {owner2}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
      {ret && <Redirect to="/StudentDashBoard" />}
    </div>
  )
}

MyProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MyProfile);