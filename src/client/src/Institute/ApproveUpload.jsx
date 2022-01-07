import React, { useCallback, useEffect, useRef, useState } from "react";
import { Grid, Typography, Card, Button, Container } from "@material-ui/core";

const ApproveUpload = ({ accounts, contract }) => {
  const mounted = useRef(true);
  const [approvalRequests, setApprovalRequests] = useState([]);
  const [counter, setCounter] = useState(0);

  const getApprovalRequests = async () => {
    if (contract && accounts) {
        let studentWalletsLinkedWithInst = await contract.methods
        .getInstitutesWallet(accounts[0])
        .call();

        studentWalletsLinkedWithInst = [...new Set(studentWalletsLinkedWithInst)];

        let list = [];
        await Promise.all(studentWalletsLinkedWithInst.map(async studentWallet => {
          let uploadList = await contract.methods.getUploadReqList(studentWallet).call();
          const profile = await contract.methods.getProfile(studentWallet).call();

          uploadList = uploadList.filter(x => x !== "0x0000000000000000000000000000000000000000").map((studentWallet) => {
            return {
              instituteWallet: accounts[0],
              studentWallet,
              name: profile[0],
              pic: profile[1]
            }
          });

          list = [...list, ...uploadList];
        }));

        if (mounted.current) setApprovalRequests(list);
      }
  }

  useEffect(() => {
    getApprovalRequests();
    return () => { mounted.current = false }
  }, [contract, accounts, counter]);

  const getDoc = useCallback(async (add) => {
    var r = await contract.methods.getUploadReqPic(add, accounts[0]).call();
    if (r.length > 0) {
      window.open(`https://gateway.ipfs.io/ipfs/${r}`);
    } else {
      window.alert("NULL");
    }
  }, [contract, accounts]);

  const approve = useCallback(async (add) => {
    try {
      await contract.methods
      .approveUploadbyInstitute(accounts[0], add)
      .send({ from: accounts[0] });
      setCounter(counter + 1);
    } catch (error) {
      console.error(error);
    }
    
  }, [contract, accounts, counter]);

  return (
    
    <div style={{
      margin: "40px 100px"
    }}>
      <Typography variant="h4" style={{ padding: "20px", color: "#3F51B5" }}>
          Approvals
          <br />
        </Typography>
      {
        approvalRequests.length > 0 ? approvalRequests.map((request, id) => {
          return (
            <div key={request.studentWallet + " " + id.toString()}>
              <Grid container style={{ marginTop: "60px" }}>
                <Grid item md={3} />
                <Grid item md={6}>
                  <Card style={{ padding: "15px", width: "700px" }}>
                    <Typography variant="h4" color="primary">
                      Document Approval
                    </Typography>
                    <hr />
                    <Typography variant="body1">
                      <span>
                        Request from: {request.name}
                        <br />
                        <em style={{ color: "#d50000" }}>
                          {request.studentWallet.substring(0, 10)}
                        </em>
                      </span>
                    </Typography>
                    <br />
                    <Grid container>
                      <Grid item md={3} />
                      <Button variant="outlined" color="secondary">
                        Deny
                      </Button>
                      <Grid item md={1} />
                      <Button
                        variant="outlined"
                        onClick={() => getDoc(request.studentWallet)}
                        style={{ color: "#388e3c" }}
                      >
                        View
                      </Button>
  
                      <Grid item md={1} />
                      <Button
                        variant="outlined"
                        onClick={() => approve(request.studentWallet)}
                        style={{ color: "#388e3c" }}
                      >
                        Allow
                      </Button>
                    </Grid>
                    <br />
                    <Typography variant="caption" style={{ textAlign: "center" }}>
                      (You can change your Account Prefernces by going int0 the
                      Account settings Page.)
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </div>
          );
        }) : 
        <Container maxWidth="sm" style={{margin: "0 250px"}}>
          <Typography variant="h4" color="primary">
            No Approval Requests
          </Typography>
        </Container>
      }
    </div>
  );
};

export default ApproveUpload;
