// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Xes { 
    
    address public creator; 
    uint public amountFounded;
    mapping(string => address) public users;

    constructor(){
        creator = msg.sender; 
    }

    function withdrawFundMe() onlyOwner() public {
        payable(msg.sender).transfer(amountFounded);
    }

    function fundMe(uint amount) public payable {
        amountFounded += amount;
    }

    function userCreate(string calldata username) public {
        require(users[username] == address(0x0), "User already exists");
        users[username] = msg.sender; 
    }

    function send(string calldata username, uint amount) public payable {
        require(amount == msg.value, "value sended must be equal to amount");
        require(users[username] != address(0x0), "no such user");

        payable(users[username]).transfer(amount);
    }

    function getUserAddress(string calldata username) public view returns (address){
        return users[username];
    }

    modifier onlyOwner()
    {
        require(msg.sender == creator);
        _;
    }

}
