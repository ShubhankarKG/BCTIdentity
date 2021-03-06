import {
  AppBar, Avatar,
  Box, Grid, Toolbar, Typography
} from "@material-ui/core";
import AccountsBox from '@material-ui/icons/AccountBox';
import React, { useEffect, useRef, useState } from "react";
import {
  Link
} from "react-router-dom";
import MyDocuments from "./MyDocuments";

const StudentDashBoard = ({ accounts, contract }) => {
  const [profilepic, setProfilepic] = useState("");
  const mounted = useRef(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const response1 = await contract.methods.getProfile(accounts[0]).call();

      if (mounted.current) {
        setProfilepic(response1[1]);
      }
    }

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
                  <AccountsBox />
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
