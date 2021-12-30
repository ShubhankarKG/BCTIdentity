import React, { Component, useEffect, useState } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";

// import DabContract from "./contracts/Dab.json";
import {child, getDatabase, ref, set} from "firebase/database";
import getWeb3 from "./utils/getWeb3";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  BrowserRouter
} from "react-router-dom";
import MyProfile from "./Student/MyProfile.jsx";
import MyInstitute from "./Institute/MyInstitute.jsx";
import MultiSigCreationInst from "./Institute/MultiSigCreationInst.jsx";
import MultiSigCreationStud from "./Student/MultiSigCreationStud";
import UpdateProfile from "./Student/UpdateProfile.jsx";
import StudentDashBoard from "./Student/StudentDashBoard.jsx";
import InstituteDashBoard from "./Institute/InsituteDashBoard.jsx";
import Dash from "./Institute/Dash.jsx";
import Login from "./Login/Login.jsx";
import UpdateProf from "./Student/UpdateProfile2.jsx";
import SignUpGoogle from "./Auth/SignUpG.jsx";
import SignUpGoogleI from "./Auth/SignUpI";
import NotFound from "./404/NotFound";
import Home from "./Home/Home";

const App = () => {
  const [storageValue, setStorageValue] = useState(0);
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);
  const [student, setStudent] = useState({
    pendinguploads: ["ssc", "hsc"],
  }); 

  useEffect(() => {
    const init = async () => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = SimpleStorageContract.networks[networkId];
        const instance = new web3.eth.Contract(
          SimpleStorageContract.abi,
          deployedNetwork && deployedNetwork.address,
        );

        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        setWeb3(web3);
        setAccounts(accounts);
        setContract(instance);
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    };

    init();
  }, []);

  if (!web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          {" "}
          <Switch>
            <Route
              exact
              path="/login"
              component={() => (
                <Login
                  accounts={accounts}
                  contract={contract}
                />
              )}
            />{" "}
            <Route
              path="/CreateStudMultisig"
              component={() => (
                <MultiSigCreationStud
                  accounts={accounts}
                  contract={contract}
                />
              )}
            />
            <Route
              path="/GoogleLoginS"
              component={() => (
                <SignUpGoogle
                  accounts={accounts}
                  contract={contract}
                />
              )}
            />
            <Route
              path="/GoogleLoginI"
              component={() => (
                <SignUpGoogleI
                  accounts={accounts}
                  contract={contract}
                />
              )}
            />
            <Route
              path="/CreateInstMultisig"
              component={() => (
                <MultiSigCreationInst
                  accounts={accounts}
                  contract={contract}
                />
              )}
            />
            <Route
              path="/MyProfileStud"
              component={() => (
                <MyProfile
                  accounts={accounts}
                  contract={contract}
                />
              )}
            />{" "}
            <Route
              path="/MyProfileInst"
              component={() => (
                <MyInstitute
                  accounts={accounts}
                  contract={contract}
                />
              )}
            />
            <Route
              path="/createstud"
              component={() => (
                <UpdateProfile
                  accounts={accounts}
                  contract={contract}
                />
              )}
            />
            <Route
              path="/createinst"
              component={() => (
                <UpdateProf
                  accounts={accounts}
                  contract={contract}
                />
              )}
            />
            <Route
              path="/StudentDashBoard"
              component={() => (
                <StudentDashBoard
                  accounts={accounts}
                  contract={contract}
                />
              )}
            />
            <Route
              path="/InstituteDashBoard"
              component={() => (
                <InstituteDashBoard
                  accounts={accounts}
                  contract={contract}
                />
              )}
            />
            <Route
              path="/dd"
              component={() => (
                <Dash
                  accounts={accounts}
                  contract={contract}
                />
              )}
            />
            <Route exact path="/" component={Home} />
            <Route component={() => <NotFound />} />
          </Switch>{" "}
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
