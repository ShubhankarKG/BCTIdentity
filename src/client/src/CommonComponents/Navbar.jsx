import * as React from 'react';
import {AppBar,Box,Toolbar,Typography,Button} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUserCheck} from '@fortawesome/free-solid-svg-icons';
// import {Me} from '@material-ui/icons';
// import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{backgroundColor:'#242424'}}>
        <Toolbar>
        <FontAwesomeIcon icon={faUserCheck} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          &nbsp;&nbsp;BCTIdentity
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

