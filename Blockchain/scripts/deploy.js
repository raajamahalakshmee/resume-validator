const hre = require("hardhat");

async function main() {
    // Deploy ResumeStorage contract
    const ResumeStorage = await hre.ethers.getContractFactory("ResumeStorage");
    const resumeStorage = await ResumeStorage.deploy();
    await resumeStorage.waitForDeployment();
    console.log(`ResumeStorage deployed to: ${await resumeStorage.getAddress()}`);

    // Deploy ResumeValidation contract
    const ResumeValidation = await hre.ethers.getContractFactory("ResumeValidation");
    const resumeValidation = await ResumeValidation.deploy();
    await resumeValidation.waitForDeployment();
    console.log(`ResumeValidation deployed to: ${await resumeValidation.getAddress()}`);

    // Deploy ResumeToken contract
    const ResumeToken = await hre.ethers.getContractFactory("ResumeToken");
    const resumeToken = await ResumeToken.deploy();
    await resumeToken.waitForDeployment();
    console.log(`ResumeToken deployed to: ${await resumeToken.getAddress()}`);

    // Deploy ResumeAccessControl contract
    const ResumeAccessControl = await hre.ethers.getContractFactory("ResumeAccessControl");
    const resumeAccessControl = await ResumeAccessControl.deploy();
    await resumeAccessControl.waitForDeployment();
    console.log(`ResumeAccessControl deployed to: ${await resumeAccessControl.getAddress()}`);
}

// Run script and handle errors
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
