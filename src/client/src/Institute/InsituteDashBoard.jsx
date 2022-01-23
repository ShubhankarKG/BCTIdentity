import { faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AppBar, Avatar,
  Box, Grid, Toolbar, Typography
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import {
  Link
} from "react-router-dom";
import ApproveUpload from "./ApproveUpload";
import LinkedAccount from "./LinkedAccounts";

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
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" style={{ backgroundColor: '#242424' }}>
            <Toolbar>
              <FontAwesomeIcon icon={faUserCheck} />

              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  &nbsp;&nbsp;BCTIdentity
                </Typography>
              </Link>
              <div style={{ paddingLeft: "60px" }} />
              <div style={{ display: "flex", justifyContent: "space-between", width: "100%", paddingTop: "5px" }}>
                <div style={{ display: "flex" }}>
                  <Typography style={{ cursor: "pointer" }} variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={() => setCounter(0)}>
                    &nbsp;&nbsp;Students
                  </Typography>
                  <div style={{ paddingLeft: "60px" }} />
                  <Typography variant="h6" style={{ cursor: "pointer" }} component="div" sx={{ flexGrow: 1 }} onClick={() => setCounter(1)}>
                    &nbsp;&nbsp;Approvals
                  </Typography>
                </div>
                <Link to="/MyProfileInst" style={{ textDecoration: "none", color: "white" }}>
                  <Avatar
                    style={{
                      width: 40,
                      height: 40,
                      marginLeft: "33.33%"
                    }}
                    src={`https://gateway.ipfs.io/ipfs/${profilepic}`}
                  />
                </Link>
              </div>

            </Toolbar>
          </AppBar>
        </Box>
      </Grid>
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Typography
          variant="h4"
          style={{ color: "#242424", textAlign: "center" }}
        >
          Institute Profile
        </Typography>
      </div>
      {counter === 0 ? (
        <LinkedAccount accounts={accounts} contract={contract} />
      ) : (
        <ApproveUpload accounts={accounts} contract={contract} />
      )}
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
