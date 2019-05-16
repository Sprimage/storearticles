var Store = artifacts.require("./Store.sol");
const assert = require('assert');
var Tx = require('ethereumjs-tx');
const keccak256 = require('keccak256');
const ganache = require("ganache-cli");
const Web3 = require("web3");
var privateKey = Buffer.from('274ae2fd57cec8d3b260c988a432c958593d4b965704cee17b4a564b85c4187c', 'hex');

let contractInstance;
const web3 = new Web3(ganache.provider());

contract('Store', (accounts) => {
   beforeEach(async () => {
      contractInstance = await Store.deployed()
   })
 
  it('should submit an article to the blockchain', async () => {
         var rawTx = {
         nonce: '0x00',
         gasPrice: '0x09184e72a000', 
         gasLimit: '0x2710',
         to: '0x0000000000000000000000000000000000000000', 
         value: '0x00', 
         data: data = keccak256(contractInstance.publishArticle).slice(12) + "lorem ipum got some articles"
        }
        var tx = new Tx(rawTx);
        tx.sign(privateKey);
        var serializedTx = tx.serialize();
        //console.log(serializedTx.toString('hex'));
        //f889808609184e72a00082271094000000000000000000000000000000000000000080a47f74657374320000000000000000000000000000000000000000000000000000006000571ca08a8bbf888cfa37bbf0bb965423625641fc956967b81d12e23709cead01446075a01ce999b56a8a88504be365442ea61239198e23d1fce7d00fcfc5cd3b44b7215f
        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
         if (!err)
           console.log(hash); // "0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385"
        });
   })
})
     
