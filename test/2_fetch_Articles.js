// const Store = artifacts.require("./Store.sol");
// const Web3 = require("web3");

// let contractInstance;
// let options = {
//   defaultBlock: "latest",
//   transactionConfirmationBlocks: 0,
//   transactionBlockTimeout: 0
// };
// const web3 = new Web3("http://localhost:8545", null, options);

// contract("Store", accounts => {
//   beforeEach(async () => {
//     contractInstance = await Store.deployed();
//   });

//   it("should fetch an article from the blockchain", async () => {
//     console.log(contractInstance.address);
//     const num = await contractInstance.fetchLatestArticle({
//       from: accounts[0]
//     });
//     console.log(num);
    
//     // const number = await contractInstance.articles(0);
//   });
// });
