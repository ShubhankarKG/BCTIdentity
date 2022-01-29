import React, { useCallback, useEffect, useRef, useState } from "react";
import { Grid, Typography, Card, Button, Container } from "@material-ui/core";

const ApproveUpload = ({ accounts, contract }) => {
  const mounted = useRef(true);
  const [approvalRequests, setApprovalRequests] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
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
      margin: "40px auto"
    }}>
      <Typography variant="h4" style={{ padding: "20px", color: "#3F51B5" }}>
        Approvals
        <br />
      </Typography>
      {
        approvalRequests.length > 0 ? approvalRequests.map((request, id) => {
          return (
            <div key={request.studentWallet + " " + id.toString()}>
              <Grid container>
                <Grid item
                  md={8}
                  style={{ width: "400px", paddingTop: "20px" }}>
                  <Card style={{ padding: "15px", width: "700px" }}>
                    <Typography variant="h4" color="primary">
                      File Approval
                    </Typography>
                    <hr />
                    <Typography variant="body1">
                      <span>
                        Request from: {request.name}
                        <br />
                        <em style={{ color: "#d90000" }}>
                          {request.studentWallet}
                        </em>
                      </span>
                    </Typography>
                    <br />
                    <Grid container>
                      <Grid item md={3} />
                      <Button variant="contained" color="secondary">
                        Deny
                      </Button>
                      <Grid item md={1} />
                      <Button
                        variant="contained"
                        onClick={() => getDoc(request.studentWallet)}
                        style={{ color: "white", backgroundColor: "#2caddb" }}
                      >
                        View
                      </Button>

                      <Grid item md={1} />
                      <Button
                        variant="contained"
                        onClick={() => approve(request.studentWallet)}
                        style={{ color: "white", backgroundColor: "#28c752" }}
                      >
                        Allow
                      </Button>
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            </div>
          );
        }) :
          <Container maxWidth="sm" style={{ margin: "0 250px" }}>
            <Typography variant="h4" color="primary">
              No Approval Requests
            </Typography>
          </Container>
      }
    </div>
  );
};

export default ApproveUpload;
