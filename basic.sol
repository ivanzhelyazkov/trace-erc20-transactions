pragma solidity ^0.5.7;
contract IERC20 {
    function balanceOf(address owner) public view returns (uint256 balance);
    function transfer(address to, uint256 value) public;

    event Transfer(address indexed from, address indexed to, uint256 value);
}
