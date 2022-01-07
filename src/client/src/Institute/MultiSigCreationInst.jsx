import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Checkbox from "@material-ui/core/Checkbox";
import SimpleStorageContract from "../contracts/SimpleStorage.json";
import getWeb3 from "../utils/getWeb3";
import { Redirect } from "react-router-dom";
import { Divider, Typography } from "@material-ui/core";
import Navbar from "../CommonComponents/Navbar";

class MultiSigCreationInst extends Component {
  state = {
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null,
    tnc: false,
    txt: "",
    InstAdd: "",
    UserAdd: "",
    go: false
  };
  created = async () => {
    const { accounts, contract } = this.props;

    console.log(contract);

    await contract.methods
      .createNewMultiSigInst(this.state.InstAdd)
      .send({ from: accounts[0] });
    const response = await contract.methods.getOwners(accounts[0]).call();

    await this.setState({ owner1: response[0] });
    await this.setState({ owner2: response[1] });
    console.log("owner:Institute:" + response[0]);

    console.log("owner:Student:" + response[1]);

    this.setState({ contr: !this.state.contr });
  };

  handleChange = (name) => (event) => {
    this.setState({ tnc: true });
  };
  set = () => {
    this.setState({ go: true });
  };
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  runExample = async () => {};

  render() {
    return (
      <div style={{height: "100vh"}}>
        <Navbar />
        <Container maxWidth="md" style={{ marginTop: 64 }}>
        {this.state.contr ? <Redirect to="/institutedashboard" /> : null}
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          style={{ height: "100%" }}
        >
          <Paper style={{ padding: 32 }}>
            <Typography variant="h4">Create New MultiSig Wallet!</Typography>
            <Divider />
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography>Enter Student Address:</Typography>
              <TextField
                required
                id="outlined-required"
                label="Required"
                //   defaultValue="Hello World"
                margin="normal"
                variant="outlined"
                onChange={(e) => {
                  this.setState({ InstAdd: e.target.value });
                  console.log(e.target.value);
                }}
              />
            </Grid>
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography>Your Address:</Typography>
              <TextField
                disabled
                id="outlined-disabled"
                label="Your Address"
                defaultValue={this.props.accounts[0]}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid>
              <Checkbox
                checked={this.state.checkedB}
                onChange={this.handleChange("checkedB")}
                value="checkedB"
                color="primary"
              />
              I have read and Agree to All the{" "}
              <a href="https://metamask.io/"> Terms And Conditions</a>.
            </Grid>
            <Grid container direction="row" justifyContent="center">
              <Button
                variant="outlined"
                color="primary"
                style={{ position: "unset", marginBottom: "15px" }}
                onClick={this.created.bind(this)}
              >
                Go!
              </Button>
            </Grid>
            <Divider />
            <Grid container direction="column" alignItems="center" justifyContent="space-around">
              <Typography style={{marginTop: 6}}>OR</Typography>
              <Button
                variant="outlined"
                color="primary"
                style={{ position: "unset", marginBottom: "15px", marginTop: 6 }}
                onClick={this.set}
              >
                Go To Dashboard{" "}
              </Button>
            </Grid>
          </Paper>
        </Grid>
        {this.state.go ? <Redirect to="/InstituteDashBoard" /> : null}
      </Container>
      </div>
    );
  }
}

export default MultiSigCreationInst;
