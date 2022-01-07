import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Checkbox from "@material-ui/core/Checkbox";
import SimpleStorageContract from "../contracts/SimpleStorage.json";
import getWeb3 from "../utils/getWeb3";
import { Redirect } from "react-router-dom";
import Navbar from "../CommonComponents/Navbar";
import { Container, Divider, Paper, Typography } from "@material-ui/core";

class MultiSigCreationStud extends Component {
  state = {
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null,
    tnc: false,
    txt: "",
    InstAdd: "",
    UserAdd: "",
    owner1: " ",
    owner2: " ",
    trig: false
  };
  created = async () => {
    const { accounts, contract } = this.props;

    console.log(accounts);

    try {
      await contract.methods
        .createNewMultiSigUser(this.state.InstAdd)
        .send({ from: accounts[0], gas: 2100000 });
      const response = await contract.methods.getOwners(accounts[0]);
      console.log(response);

      this.setState({ owner1: response[0] });
      this.setState({ owner2: response[1] });
      console.log("owner:Student:" + response[0]);
      console.log("owner:Institute:" + response[1]);
      this.setState({ trig: true });
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = (name) => (event) => {
    this.setState({ tnc: true });
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
      <div>
        <Navbar />
        <Container maxWidth="md" style={{ marginTop: 64 }}>
          {this.state.trig ? <Redirect to="/StudentDashBoard" /> : null}
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
                <Typography>
                  Enter Institute Address:
                </Typography>
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
                <Typography>
                  Your Address:
                </Typography>
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
                  style={{ position: "unset"}}
                  onClick={this.created.bind(this)}
                >
                  Go!
                </Button>
              </Grid>
            </Paper>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default MultiSigCreationStud;
