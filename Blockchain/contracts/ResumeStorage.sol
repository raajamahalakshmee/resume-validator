// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ResumeStorage {
    struct Resume {
        string ipfsHash;
        bool validated;
    }

    mapping(address => Resume) public resumes;
    event ResumeUploaded(address indexed user, string ipfsHash);

    function uploadResume(string memory _ipfsHash) external {
        resumes[msg.sender] = Resume(_ipfsHash, false);
        emit ResumeUploaded(msg.sender, _ipfsHash);
    }

    function getResume(address _user) external view returns (string memory, bool) {
        Resume storage resume = resumes[_user];
        return (resume.ipfsHash, resume.validated);
    }
}
