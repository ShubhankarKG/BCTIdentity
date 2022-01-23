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

    function createNewMultiSigUser(address institute_address) public returns (bool) {
        wallets[msg.sender].owners.inst = institute_address;
        wallets[msg.sender].owners.stud = msg.sender;
        listofwall[msg.sender] = true;
        iminwall[a].push(msg.sender);
        return true;
    }

    constructor() public {}

    function createNewMultiSigInst(address student_address) public {
        wallets[msg.sender].owners.stud = student_address;
        wallets[msg.sender].owners.inst = msg.sender;
        listofwall[msg.sender] = true;
        iminwall[msg.sender].push(a);
    }

    function doesWalletExists(address addr) public view returns (bool) {
        if (listofwall[addr] == true) return true;
        else return false;
    }

    function createUploadRequestbyUser(bool has_aadhaar, string memory hash) public {
        address inst = wallets[msg.sender].owners.inst;
        wallets[msg.sender].uploadreq[inst].approve.stud = true;
        wallets[msg.sender].uploadreq[inst].approve.inst = false;
        wallets[msg.sender].uploadreq[inst].aadhar = has_aadhaar;
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

    function approveUploadbyInstitute(address ad, address student) public returns (bool) {
        wallets[student].uploadreq[ad].approve.inst = true;
        if (
            wallets[student].uploadreq[ad].approve.stud &&
            wallets[student].uploadreq[ad].approve.inst
        ) {
            wallets[student].doc.aadhar = wallets[student]
                .uploadreq[ad]
                .aadharhash;

            delete wallets[student].listofuploadreq[
                wallets[student].listofuploadreq.length - 1
            ];
            return true;
        } else {
            return false;
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

    function createNEwAccess(address stud, address ad) public {
        wallets[stud].owners.listofpartialowner.push(ad);

        wallets[ad].ihaveaccess.push(stud);

        wallets[ad].PastOwners.push(ad);
    }

    function getUploadReqPic(address stud, address inst)
        public
        view
        returns (string memory)
    {
        return wallets[stud].uploadreq[inst].aadharhash;
    }
}
