import React, { useEffect, useState } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";

// import DabContract from "./contracts/Dab.json";
import getWeb3 from "./utils/getWeb3";

import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom";
import MyProfile from "./Student/MyProfile.jsx";
import MyInstitute from "./Institute/MyInstitute.jsx";
import MultiSigCreationInst from "./Institute/MultiSigCreationInst.jsx";
import MultiSigCreationStud from "./Student/MultiSigCreationStud";
import StudentDashBoard from "./Student/StudentDashBoard.jsx";
import InstituteDashBoard from "./Institute/InsituteDashBoard.jsx";
import Login from "./Login/Login.jsx";
import UpdateProfile from "./Student/UpdateProfile.jsx";
import NotFound from "./404/NotFound";
import Home from "./Home/Home";
import InstituteLogin from "./Institute/InstituteLogin";

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);
  
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

  useEffect(() => {
    window.ethereum.on('accountsChanged', (accounts) => {
      setAccounts(accounts);
    });
  })

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
              exact
              path="/institute-login"
              component={() => (
                <InstituteLogin
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
                  student={true}
                />
              )}
            />
            <Route
              path="/createinst"
              component={() => (
                <UpdateProfile
                  accounts={accounts}
                  contract={contract}
                  student={false}
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
            <Route exact path="/" component={Home} />
            <Route component={() => <NotFound />} />
          </Switch>{" "}
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
