// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ResumeAccessControl {
    mapping(address => mapping(address => bool)) public accessList;
    event AccessGranted(address indexed user, address indexed employer);
    event AccessRevoked(address indexed user, address indexed employer);

    function grantAccess(address _employer) external {
        accessList[msg.sender][_employer] = true;
        emit AccessGranted(msg.sender, _employer);
    }

    function revokeAccess(address _employer) external {
        accessList[msg.sender][_employer] = false;
        emit AccessRevoked(msg.sender, _employer);
    }

    function hasAccess(address _user, address _viewer) external view returns (bool) {
        return accessList[_user][_viewer];
    }
}
