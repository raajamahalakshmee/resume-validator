// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ResumeToken is ERC20 {
    address public admin;

    constructor() ERC20("ResumeCoin", "RSC") {
        admin = msg.sender;
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    function rewardUser(address _user, uint256 _amount) external {
        require(msg.sender == admin, "Only admin can reward");
        _mint(_user, _amount);
    }
}
