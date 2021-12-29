// SPDX-License-Identifier: MIT
pragma solidity ^0.8;
contract Ballot {
  struct Documents {  
    string aadhar;
  }
  
  struct MultiSig { 
    address inst;
    address stud;
    Documents documents;  
  }

  mapping(address=>MultiSig) public wallets ;

  function createNewMultiSigbyUser(address instituteaddress) public {
    MultiSig storage wa = wallets[msg.sender];
    wa.inst=instituteaddress;
    wa.stud=msg.sender;
  }

  function uploadAadhar(string memory) public pure returns (bool) {
    // MultiSig storage wa=wallets[msg.sender];
    return true;
  }
}
