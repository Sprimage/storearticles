const Store = artifacts.require("./Store.sol");
const Web3 = require("web3");

let contractInstance;
let options = {
  defaultBlock: "latest",
  transactionConfirmationBlocks: 0,
  transactionBlockTimeout: 0
};
const web3 = new Web3("http://localhost:8545", null, options);

contract("Store", accounts => {
  beforeEach(async () => {
    contractInstance = await Store.deployed();
  });

  it("should submit an article to the blockchain", async () => {
    var rawTx = {
      gasPrice: web3.utils.numberToHex("100000000000"),
      gasLimit: web3.utils.numberToHex("1500000"),
      from: accounts[0],
      to: contractInstance.address,
      value: "0x00",
      data: web3.utils
        .keccak256("publishArticle()")
        .slice(0, 10)
        .concat(web3.utils.utf8ToHex("lorem ipum got some articles").slice(2))
    };

    const txHash = await web3.eth.sendTransaction(rawTx);
  });

  it("should fetch article fome the blockchain", async () => {
    const number = await contractInstance.fetchLatestArticle({
      from: accounts[0],
      gas: 50000
    });
    const transactionHash = (await web3.eth.getBlock(number)).transactions[0];
    const transactionDetails = await web3.eth.getTransaction(transactionHash);
    const article = web3.utils.toUtf8(
      "0x" + transactionDetails.input.slice(10)
    );
    assert.equal(article, "lorem ipum got some articles");
  });
});
