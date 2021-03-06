import {
  Accordion, AccordionDetails, AccordionSummary, Avatar,
  Button, Card,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Grid, TextField, Typography
} from "@material-ui/core";
import green from "@material-ui/core/colors/green";
import { Assignment, ExpandMore, Folder } from "@material-ui/icons";
import React, { Component } from "react";
import ipfs from "../ipfs";

class MyDocuments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      aadhar: "",
      a: "QmafSZjxx8QaqJJBEyxRej7D9E8STGCbLzwVRgT2U7ctug",
      hasAadhar: false,
      lastuploadername: "",
      lastuploaderadd: "",
      lastuploaderpic: "",
      aa: ""
    };
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  captureFile = event => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      // this.setState({ buffer: Buffer(reader.result) });
      //   console.log("buffer", Buffer(reader.result));

      this.hj(Buffer(reader.result));
    };
  };

  hih = async () => {
    const { accounts, contract } = this.props;

    await contract.methods
      .uploadAadhar(this.state.aadhar)
      .send({ from: accounts[0] });
    const response = await contract.methods.getAadhar(accounts[0]).call();

    this.setState({ aadhar: response }); //check once
    console.log(this.state);
  };

  hj = async a => {
    await ipfs.add(a, (err, ipfsHash) => {
      console.log(err, ipfsHash);

      this.setState({ aadhar: ipfsHash[0].hash });
    });
  };

  newUpload = async () => {
    const { accounts, contract } = this.props;

    await contract.methods
      .createUploadRequestbyUser(true, this.state.aadhar)
      .send({ from: accounts[0] });
    var t = await contract.methods
      .getUploadReqList(this.props.accounts[0])
      .call();
    console.log(t);

    this.handleClose();
  };

  getDoc = async () => {
    const { accounts, contract } = this.props;
    var r = await contract.methods.getAadhar(accounts[0]).call();
    console.log(r);
    if (r.length > 0) {
      window.open(`https://gateway.ipfs.io/ipfs/${r}`);
    } else {
      window.alert("NULL");
    }
  };

  componentDidMount = async () => {
    const { accounts, contract } = this.props;

    var r = await contract.methods.getAadhar(accounts[0]).call();
    if (r.length > 0) {
      this.setState({ hasAadhar: true });
    }
  };

  render() {
    return (
      <div>
        <Grid container>
          <Grid item md={5}>
            <Card
              style={{
                marginTop: "30px",
                marginLeft: "250px",
                marginRight: "50px",
                width: "900px"
              }}
            >
              <Grid container>
                <Grid item md={1}>
                  <Avatar
                    style={{ margin: "15px", backgroundColor: "#2f2f2f" }}
                  >
                    <Folder />
                  </Avatar>
                </Grid>
                <Grid item md={10}>
                  <Typography
                    variant="h4"
                    style={{
                      padding: "10px",
                      marginLeft: "15px",
                      color: "#2f2f2f"
                    }}
                  >
                    My Documents
                    <Typography variant="caption" style={{ marginLeft: "5px" }}>
                      (Click on the Document name to view.)
                    </Typography>
                  </Typography>
                </Grid>{" "}
                {/* array map ExpPanel.jsx */}
                {this.state.hasAadhar ? (
                  <Accordion style={{ width: "800px" }}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Avatar
                        style={{
                          color: "#fff",
                          backgroundColor: green[500]
                        }}
                      >
                        <Assignment />
                      </Avatar>
                      <Typography style={{ margin: "10px" }}>
                        B.Tech Degree
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container>
                        <Grid item md={10}>
                          <Typography>
                            <em>B.Tech Degree </em> was uploaded by{" "}
                            <em>{this.state.lastuploadername}</em>. <br />
                            Uploader Address :{" "}
                            <em>{this.state.lastuploaderadd}</em>
                          </Typography>
                        </Grid>
                        <Grid item md={1}>
                          <Button
                            variant="outlined"
                            style={{ color: "green", marginLeft: "0px" }}
                            onClick={this.getDoc.bind(this)}
                          >
                            View
                          </Button>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                ) : null}
                {/* array map the above content  */}
                <br />
                <Grid container justifyContent="center">
                  <Button
                    variant="outlined"
                    color="secondary"
                    style={{ marginTop: "15px", marginBottom: "15px" }}
                    onClick={this.handleClickOpen}
                  >
                    Add New Document{"      "}
                  </Button>

                  <Dialog
                    disableEscapeKeyDown
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                  >
                    <DialogTitle id="form-dialog-title">
                      <Typography style={{ color: "#2f2f2f" }} variant="h4">
                        Add New Document
                      </Typography>
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>Enter Document Name</DialogContentText>
                      <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                      />
                      <br />
                      <DialogContentText style={{ marginTop: "15px" }}>
                        Upload Document
                      </DialogContentText>

                      <Button>
                        {" "}
                        <input onChange={this.captureFile} type="file" />{" "}
                      </Button>
                      <Button>Upload </Button>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleClose} color="primary">
                        Cancel
                      </Button>
                      <Button
                        onClick={this.newUpload.bind(this)}
                        color="primary"
                      >
                        Confirm
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default MyDocuments;
