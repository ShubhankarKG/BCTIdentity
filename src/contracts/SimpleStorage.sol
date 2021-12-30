pragma solidity ^0.5.0;

contract SimpleStorage {
    struct Documents {
        string aadhar;
        uint8 aadharno;
        string aadharnoHash;
    }

    struct PersonalInfo {
        string name;
        string propic;
        string email;
        string phone;
    }

    struct Owners {
        uint8 max;
        address stud;
        address inst;
        mapping(address => PartialOwner) partialowner;
        address[] listofpartialowner;
    }

    struct Request {
        bool stud;
        bool inst;
        bool aadhar;
    }

    struct ApprovalRequest {
        bool stud;
        bool inst;
    }

    struct ChangeOwnerShip {
        bool stud;
        bool inst;
        address studa;
        address insta;
        ApprovalRequest approve;
    }

    struct ChangeOwnerShipInst {
        bool inst;
        bool stud;
        address neinst;
        address nestud;
        uint256 timestamp;
    }

    struct Upload {
        ApprovalRequest approve;
        bool aadhar;
        string aadharhash;
        uint256 timestamp;
    }

    struct PartialOwner {
        bool aadhar;
        uint256 day;
        uint256 expiry;
    }

    struct PartialOwnerRequest {
        ApprovalRequest approve;
        uint256 day;
        bool aadhar;
    }

    struct MultiSig {
        Owners owners;
        Documents doc;
        PersonalInfo profile;
        mapping(address => Upload) uploadreq;
        address[] listofuploadreq;
        address[] listofchangeowneri;
        mapping(address => ChangeOwnerShipInst) changeowneri;
        mapping(address => PartialOwnerRequest) partialowner;
        address[] listofpartialowner;
        address[] ihaveaccess;
        address[] PastOwners;
    }

    mapping(address => MultiSig) wallets;
    mapping(address => bool) listofwall;
    mapping(address => address[]) iminwall;
    address public j;

    function createNewMultiSigUser(address a) public returns (bool) {
        wallets[msg.sender].owners.inst = a;
        wallets[msg.sender].owners.stud = msg.sender;
        listofwall[msg.sender] = true;
        iminwall[a].push(msg.sender);
        return true;
    }

    constructor() public {}

    function createNewMultiSigInst(address a) public {
        wallets[msg.sender].owners.stud = a;
        wallets[msg.sender].owners.inst = msg.sender;
        listofwall[msg.sender] = true;
        iminwall[msg.sender].push(a);
    }

    function doesWalletExists(address a) public view returns (bool) {
        if (listofwall[a] == true) return true;
        else return false;
    }

    function createUploadRequestbyUser(bool ad, string memory hash) public {
        address inst = wallets[msg.sender].owners.inst;
        wallets[msg.sender].uploadreq[inst].approve.stud = true;
        wallets[msg.sender].uploadreq[inst].approve.inst = false;
        wallets[msg.sender].uploadreq[inst].aadhar = ad;
        wallets[msg.sender].uploadreq[inst].aadharhash = hash;
        wallets[msg.sender].listofuploadreq.push(msg.sender);
        wallets[msg.sender].uploadreq[inst].timestamp = now;
    }

    function createUploadRequestbyInstitute(
        address a,
        bool ad,
        string memory hash
    ) public {
        wallets[a].uploadreq[a].approve.inst = true;
        wallets[a].uploadreq[a].approve.stud = false;
        wallets[a].uploadreq[a].aadhar = ad;
        wallets[a].uploadreq[a].timestamp = now;
        wallets[a].uploadreq[a].aadharhash = hash;
        wallets[a].listofuploadreq.push(msg.sender);
        wallets[a].doc.aadhar = hash;
    }

    function getUploadReqList(address ad)
        public
        view
        returns (address[] memory)
    {
        return wallets[ad].listofuploadreq;
    }

    function approveUploadbyUser(address ad) public {
        wallets[msg.sender].uploadreq[ad].approve.stud = true;
        if (
            wallets[msg.sender].uploadreq[ad].approve.stud &&
            wallets[msg.sender].uploadreq[ad].approve.inst
        ) {
            wallets[msg.sender].doc.aadhar = wallets[msg.sender]
                .uploadreq[ad]
                .aadharhash;
            delete wallets[msg.sender].listofuploadreq[
                wallets[msg.sender].listofuploadreq.length - 1
            ];
        }
    }

    function approveUploadbyInstitute(address ad, address student) public {
        wallets[student].uploadreq[ad].approve.inst = true;
        if (
            wallets[student].uploadreq[ad].approve.stud &&
            wallets[student].uploadreq[ad].approve.inst
        ) {
            wallets[student].doc.aadhar = wallets[student]
                .uploadreq[ad]
                .aadharhash;

            delete wallets[ad].listofuploadreq[
                wallets[ad].listofuploadreq.length - 1
            ];
        }
    }

    function getAadhar(address stud) public view returns (string memory) {
        return wallets[stud].doc.aadhar;
    }

    function getOwners(address a) public view returns (address, address) {
        return (wallets[a].owners.stud, wallets[a].owners.inst);
    }

    function getInstitutesWallet(address ad)
        public
        view
        returns (address[] memory)
    {
        return iminwall[ad];
    }

    function getInstitutesUploadList(address ad)
        public
        view
        returns (address[] memory)
    {
        return wallets[ad].listofuploadreq;
    }

    function changeOwnerInstfromInst(address stud, address Inst) public {
        wallets[stud].changeowneri[msg.sender].inst = true;
        wallets[stud].changeowneri[msg.sender].neinst = Inst;
        wallets[stud].listofchangeowneri.push(msg.sender);
        wallets[stud].changeowneri[msg.sender].timestamp = now;
        wallets[stud].changeowneri[msg.sender].stud = true;
        wallets[stud].owners.inst = wallets[stud]
            .changeowneri[msg.sender]
            .neinst;
    }

    function changeOwnerInstfromStud(address Inst) public {
        wallets[msg.sender].changeowneri[msg.sender].stud = true;
        wallets[msg.sender].changeowneri[msg.sender].neinst = Inst;
        wallets[msg.sender].listofchangeowneri.push(msg.sender);

        wallets[msg.sender].changeowneri[msg.sender].timestamp = now;
    }

    function getChangeOwnerList(address a)
        public
        view
        returns (address[] memory)
    {
        return wallets[a].listofchangeowneri;
    }

    function updateProf(
        string memory name,
        string memory pro,
        address my,
        string memory no,
        string memory email
    ) public {
        wallets[my].profile.name = name;
        wallets[my].profile.propic = pro;
        wallets[my].profile.phone = no;
        wallets[my].profile.email = email;
    }

    function getProfile(address a)
        public
        view
        returns (string memory, string memory)
    {
        return (wallets[a].profile.name, wallets[a].profile.propic);
    }

    function approveChangeOwnerINSTReqbyStud(address ad) public {
        wallets[msg.sender].changeowneri[ad].stud = true;
        if (
            wallets[msg.sender].changeowneri[ad].stud &&
            wallets[msg.sender].changeowneri[ad].inst
        ) {
            wallets[msg.sender].owners.inst = wallets[msg.sender]
                .changeowneri[ad]
                .neinst;
        }
    }

    function approveChangeOwnerINSTReqbyInst(address ad, address io) public {
        wallets[io].changeowneri[ad].inst = true;
        if (
            wallets[io].changeowneri[ad].stud &&
            wallets[io].changeowneri[ad].inst
        ) {
            wallets[io].owners.inst = wallets[io].changeowneri[ad].neinst;
        }
    }

    function createNewPartialOwnerRequest(
        address a,
        bool adhar,
        uint8 d
    ) public {
        wallets[a].partialowner[msg.sender].aadhar = adhar;
        wallets[a].partialowner[msg.sender].day = d;
        wallets[a].listofpartialowner.push(msg.sender);
    }

    function getPartialOwnerShipList(address a)
        public
        view
        returns (address[] memory)
    {
        return wallets[a].listofpartialowner;
    }

    // function approvePartialOwnerReqfromStudent (address reqq) public {

    // wallets[msg.sender].partialowner[reqq].approve.stud=true;

    // if( wallets[msg.sender].partialowner[reqq].approve.stud==true&& wallets[msg.sender].partialowner[reqq].approve.inst==true)
    //     {
    //         wallets[msg.sender].owners.partialowner[msg.sender].aadhar=wallets[msg.sender].partialowner[reqq].aadhar;

    //         wallets[msg.sender].owners.partialowner[msg.sender].expiry=now+ wallets[msg.sender].owners.partialowner[msg.sender].day * 1 minutes;
    //         wallets[msg.sender].owners.listofpartialowner.push(reqq);

    //     }

    // }

    // function approvePartialOwnerReqfromInst (address stud ,address reqq) public {

    //     wallets[stud].partialowner[reqq].approve.inst=true;

    //       wallets[stud].partialowner[reqq].approve.stud=true;

    //          if( wallets[stud].partialowner[reqq].approve.stud==true&& wallets[stud].partialowner[reqq].approve.inst==true)
    //       {

    //     wallets[stud].owners.partialowner[reqq].aadhar=wallets[stud].partialowner[reqq].aadhar;

    //   uint yuyu= wallets[stud].owners.partialowner[reqq].day ;

    //     wallets[stud].owners.partialowner[reqq].expiry=now+ yuyu *1 minutes;
    //     wallets[stud].owners.listofpartialowner.push(reqq);

    //           }

    // }

    // function getAadharfromPartialOwner(address  a) public view returns (string memory){

    // address [] memory va=wallets[a].owners.listofpartialowner;
    // bool flag =false;
    // for(uint i=0;i<va.length;i++){
    // if(msg.sender==va[i])
    // {
    //  flag=true;

    // }

    // }

    // if(flag==true){

    //     if(wallets[a].owners.partialowner[msg.sender].aadhar==true){

    //         if(wallets[a].owners.partialowner[msg.sender].day<now)
    //          {

    //              return wallets[a].doc.aadhar;

    //           }
    //          else {
    //              return "Date Expired";
    //          }

    //     }else {

    //         return "error";
    //     }

    //     }else {
    //         return  "a";
    //     }

    // }

    function isIamPartialOwner(address a) public view returns (bool) {
        address[] memory va = wallets[a].owners.listofpartialowner;
        bool flag = false;
        for (uint256 i = 0; i < va.length; i++) {
            if (msg.sender == va[i]) {
                flag = true;
            }
        }

        return flag;
    }

    function getPartialOwnerSList(address a)
        public
        view
        returns (address[] memory)
    {
        return wallets[a].owners.listofpartialowner;
    }

    function set() public {
        wallets[msg.sender].doc.aadhar = "HHHHHHAAH";
    }

    function getPartialOwnerShipINFO(address stud, address paro)
        public
        view
        returns (bool, uint256)
    {
        //it returns the expiry date and whether the It Has Request to aadhar or NOt
        return (
            wallets[stud].owners.partialowner[paro].aadhar,
            wallets[stud].owners.partialowner[paro].expiry
        );
    }

    function getUploadRequestTIMESTAMP(address stud, address reqq)
        public
        view
        returns (uint256)
    {
        return wallets[stud].uploadreq[reqq].timestamp;
    }

    function getChangeOwnerRequestTIMESTAMP(address stud, address reqq)
        public
        view
        returns (uint256)
    {
        return wallets[stud].changeowneri[reqq].timestamp;
    }

    function setAaadharNo(
        address a,
        uint8 qw,
        string memory io
    ) public {
        wallets[a].doc.aadharno = qw;
        wallets[a].doc.aadharnoHash = io;
    }

    function createNEwAccess(address stud, address ad) public {
        wallets[stud].owners.listofpartialowner.push(ad);

        wallets[ad].ihaveaccess.push(stud);

        wallets[ad].PastOwners.push(ad);
    }

    function getIhaveaAccess(address a) public view returns (address[] memory) {
        return wallets[a].ihaveaccess;
    }

    function getUploadReqPic(address stud, address inst)
        public
        view
        returns (string memory)
    {
        return wallets[stud].uploadreq[inst].aadharhash;
    }

    function getPastOwner(address a) public view returns (address[] memory) {
        return wallets[a].PastOwners;
    }
}
