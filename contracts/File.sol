pragma solidity ^0.4.17;

contract File{
    string public ipfsHash;
    string public decryptionKey;
    string public reciever;
    
    constructor (string memory initialIpfsHash, string memory initialDecryptionKey, string memory Reciever) public
    {
        ipfsHash = initialIpfsHash;
        decryptionKey = initialDecryptionKey;
        reciever = Reciever;
    }
}