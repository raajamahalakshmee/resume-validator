// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./ResumeStorage.sol";

contract ResumeValidation is ResumeStorage {
    event ResumeValidated(address indexed user, bool isValid);

    function validateResume(address _user) external {
        require(bytes(resumes[_user].ipfsHash).length > 0, "No resume uploaded");
        resumes[_user].validated = true;
        emit ResumeValidated(_user, true);
    }
}
