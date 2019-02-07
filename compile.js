const path = require('path')
const fs = require('fs')
const solc = require('solc')

const filePath = path.resolve(__dirname,'contracts','File.sol') // path to the solidity code
const source = fs.readFileSync(filePath, 'utf8')// read the solidity file

module.exports = solc.compile(source,1).contracts[':File'] // compile the solidity file using solc and get the contracts property in the result and the inbox property in it
