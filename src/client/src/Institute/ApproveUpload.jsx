import React, { useCallback, useEffect, useRef, useState } from "react";
import { Grid, Typography, Card, Button } from "@material-ui/core";

const ApproveUpload = ({ accounts, contract }) => {
  const mounted = useRef(true);
  const [approvalRequests, setApprovalRequests] = useState([]);

  useEffect(() => {
    (async () => {
      if (contract && accounts) {
        let studentWalletsLinkedWithInst = await contract.methods
        .getInstitutesWallet(accounts[0])
        .call();

        studentWalletsLinkedWithInst = [...new Set(studentWalletsLinkedWithInst)];

        let list = [];
        await Promise.all(studentWalletsLinkedWithInst.map(async studentWallet => {
          let uploadList = await contract.methods.getUploadReqList(studentWallet).call();
          const profile = await contract.methods.getProfile(studentWallet).call();

          uploadList = uploadList.map((studentWallet) => {
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
      })();

    return () => { mounted.current = false }
  }, [contract, accounts]);

  const getDoc = useCallback(async (add) => {
    var r = await contract.methods.getUploadReqPic(add, add).call();
    if (r.length > 0) {
      window.open(`https://gateway.ipfs.io/ipfs/${r}`);
    } else {
      window.alert("NULL");
    }
  }, [contract]);

  const approve = useCallback(async (add) => {
    await contract.methods
      .approveUploadbyInstitute(accounts[0], add)
      .send({ from: accounts[0] });
  }, [contract, accounts]);

  return (
    <div syle={{ marginTop: "1000px" }}>
      {approvalRequests.map((request, id) => {
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
                  <Typography variant="headline">
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
      })}
    </div>
  );
};

export default ApproveUpload;
