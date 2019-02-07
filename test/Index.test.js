const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

let accounts;
let file;
let ipfsHash = 'Hello world!';
let decryptionKey = 'xxx';

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  //Use one of those accounts to deploy
  // the contract
  file = await new web3.eth.Contract(JSON.parse(interface)) // the passed argument is te abi helping js to understand S.C. file
    .deploy({ data: bytecode, arguments: [ipfsHash, decryptionKey] }) // byte code of the S.C. and arguments are the SC cunrtructor argumentn
    .send({ from: accounts[0], gas: '1000000' }); // specify gas limit and account address
});

describe('File', () => {
  it('deploys a function', () => {
    assert.ok(file.options.address);
  });

  // Testing whether certian conditions are met in the contract
  it('has a default cotnents', async () => {
    const ipfsMessage = await file.methods.ipfsHash().call();
    const decrptionMessage = await file.methods.decryptionKey().call();
    assert.equal(ipfsMessage, ipfsHash);
    assert.equal(decrptionMessage, decryptionKey);
  });
});

// npm install --save solc@0.4.25 mocha ganache-cli
//npm install --save web@1.0.0-beta.15
