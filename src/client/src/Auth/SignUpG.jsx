import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {browserSessionPersistence, getAuth, GoogleAuthProvider, setPersistence, signInWithPopup} from "firebase/auth";
import fire from "../Fire";
import { Redirect } from "react-router-dom";
import { ButtonBase, Avatar, Card } from "@material-ui/core";

var provider = new GoogleAuthProvider();
class SignUpGoogle extends Component {
  state = { open: false, red: false };
  onOpenModal = () => {
    this.setState({ open: true, loggin: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  onRoll = e => {
    this.setState({ rollno: e.target.value });
  };
  onBatch = e => {
    this.setState({ batch: e.target.value });
  };

  c = e => {
    const auth = getAuth();
    signInWithPopup(auth, provider).then(result => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      this.setState({loggin: true, user, token});
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  };

  render() {
    return (
      <div>
        {/* <Button
          onClick={this.c.bind(this, this)}
          variant="contained"
          color="secondary"
          style={{ width: "80px", marginTop: 20, height: "100px" }}
        /> */}

        <Card
          className="shadow"
          style={{
            position: "absolute",
            top: "200px",
            left: "700px",
            width: "500px",
            height: "150px"
          }}
        >
          <div style={{ padding: "10px" }}>
            
            <ButtonBase onClick={this.c.bind(this, this)}>
              <Avatar>
                <img
                  src="https://blog.hubspot.com/hubfs/image8-2.jpg"
                  style={{ height: "50px" }}
                />
              </Avatar>
              <h4>Sign in with Google !</h4>
            </ButtonBase>
            
            {this.state.loggin ? <Redirect to="/OtpS" /> : null}
          </div>
        </Card>
      </div>
    );
  }
}
export default SignUpGoogle;
