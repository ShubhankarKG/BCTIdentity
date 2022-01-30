import * as React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@material-ui/core';
import AccountsBox from '@material-ui/icons/AccountBox'
import { Link } from "react-router-dom"
// import {Me} from '@material-ui/icons';
// import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: '#242424' }}>
        <Toolbar>
          <AccountsBox />
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              &nbsp;&nbsp;BCTIdentity
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

