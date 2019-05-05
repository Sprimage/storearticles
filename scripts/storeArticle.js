
  const { promisify } = require("util");
  const zlib = require("zlib");
  const deflate = promisify(zlib.deflate);;
  const express = require('express');
  const bodyParser = require('body-parser');
  const app = express();
   
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static('/public'));
  
  app.post('/post', function (req, res) {
      const ARTICLE = req.body.article;

      const Store = artifacts.require("./Store.sol");

      /*
       * Write data to blockchain
       */
      (async () => {
        const instance = await Store.deployed();

        const deflatedArticle = (await deflate(ARTICLE)).toString("hex");
        // Data to call the function of the contract
        const encodedABI = instance.contract.methods.inTransaction().encodeABI();
        // Length of the article padded to 8 bytes so it's constant in length
        const hexLength = deflatedArticle.length.toString(16).padStart(16, "0");
        const txData = encodedABI + deflatedArticle + hexLength;
        // We can't use truffle-contract directly because it resets the data paremeter
        // https://github.com/trufflesuite/truffle/issues/1586
        // Using web3 directly
        const web3 = Store.web3;
        await web3.eth.sendTransaction({
          from: (await web3.eth.getAccounts())[0],
          to: instance.address,
          data: txData,
          gas: 4000000 // A random big number
        });

       
    });
  });


app.listen(8000, () => console.log('listening on port 8000!'))