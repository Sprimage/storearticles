'use strict';

const abi = require('web3-eth-abi').AbiCoder();
const utils = require('web3-utils');
const {
  addHexPrefix
} = require('ethereumjs-util');

const rpcCall = require('kool-makerpccall');

const ganacheCall = (method, params) => rpcCall('http://localhost:8545', method, params);

const PUBLISH_ARTICLE_SIGNATURE = utils.soliditySha3('publishArticle()').substr(0, 10);

const getArticlesForBlock = async (blockNumber) => {
  const { transactions } = await ganacheCall('eth_getBlock', [ utils.fromDecimal(blockNumber), true ]);
  return transactions.filter(({ data }) => data.substr(0, 10) === PUBLISH_ARTICLE_SIGNATURE).map((v) => ({
    author: v.from,
    article: utils.hexToAscii(addHexPrefi(v.data.substr(10)))
  }));
};

const getArticlesForBlockByUser = async (blockNumber, user) => (await getArticlesForBlock(blockNumber)).filter(({ author }) => author === user).map(({ article }) => article);
