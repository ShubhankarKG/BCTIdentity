import {
  AppBar, Avatar, Card,
  Grid, IconButton, Toolbar, Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { ArrowBackSharp, SettingsPower } from "@material-ui/icons";
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
    marginLeft: -12,
    marginRight: 20
  }
};

const MyInstitute = ({ classes, accounts, contract }) => {
  const [ret, setRet] = useState(false);
  const [institute, setInstitute] = useState({
    name: "",
    address: "",
    pic: ""
  });
  const [loading, setLoading] = useState(true);
  const mounted = useRef(true);

  useEffect(() => {
    const getDetails = async () => {
      const getDet = await contract.methods.getProfile(accounts[0]).call();

      if (mounted.current) {
        setInstitute({
          name: getDet[0],
          pic: getDet[1],
          address: accounts[0],
        })
        setLoading(false);
      }
    }

    getDetails();

    return () => {
      mounted.current = false;
    };
  }, [accounts, contract]);

  return (
    <div>
      <AppBar position="static">
        <Toolbar style={{ backgroundColor: "#242424" }}>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={() => setRet(true)}
          >
            <ArrowBackSharp />
          </IconButton>
          <Typography variant="h6" className={classes.grow}>
            My Profile
          </Typography>

          <div>
            <IconButton color="inherit">
              <SettingsPower />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Grid container>
        <Grid item md={3} />
        <Grid item md={6}>
          {!loading && <Card
            className="shadow"
            style={{ marginTop: "20px", padding: "15px" }}
          >
            <Grid container>
              <Grid item md={2}>
                <Avatar style={{ width: "85px", height: "85px" }} src={institute.pic || ""} />
              </Grid>
              <Grid item md={6}>
                <Typography variant="h3">{institute.name}</Typography>
                <Typography variant="overline" style={{ fontSize: "15px" }}>
                  ADDRESS : {institute.address}
                </Typography>
              </Grid>
            </Grid>
          </Card>}
        </Grid>
      </Grid>
      {ret && <Redirect to="/InstituteDashBoard" />}
    </div>
  )
}

MyInstitute.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MyInstitute);
