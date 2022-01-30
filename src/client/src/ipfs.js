const Ipfs = require("ipfs-http-client");
const ip = new Ipfs.create({ host: "ipfs.infura.io", port: 5001, protocol: "https" });
export default ip;
