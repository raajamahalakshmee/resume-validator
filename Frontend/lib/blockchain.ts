import { ethers } from "ethers";
import { MetaMaskInpageProvider } from "@metamask/providers";

// Extend the Window interface to include ethereum
declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

// Smart contract addresses (replace with actual deployed addresses)
const resumeStorageAddress = "0x8CAe87A41A12015071558373C8913351C2dc72AA";
const resumeValidationAddress = "0x84DDDEf67e82902877f0CEf9f6DA8580315aeFC9";
const resumeTokenAddress = "0x2BC160d24D8B28D0712a51beb9482163058E0480";
const resumeAccessControlAddress = "0x562b435FF7BD0BB1A4236cfDE3BA9fD2dD9b97D9";

// ABI files (import the correct ones based on your contract compilation)
import ResumeStorageABI from "../../Blockchain/src/contracts/ResumeStorage.sol/ResumeStorage.json";
import ResumeValidationABI from "../../Blockchain/src/contracts/ResumeValidation.sol/ResumeValidation.json";
import ResumeTokenABI from "../../Blockchain/src/contracts/ResumeToken.sol/ResumeToken.json";
import ResumeAccessControlABI from "../../Blockchain/src/contracts/ResumeAccessControl.sol/ResumeAccessControl.json";

// Function to get the Ethereum provider
const getProvider = () => {
    if (window.ethereum) {
        return new ethers.BrowserProvider(window.ethereum as any);
    } else {
        throw new Error("MetaMask or a Web3 provider is required.");
    }
};

// Function to get the signer (connected wallet)
const getSigner = async () => {
    const provider = getProvider();
    return await provider.getSigner();
};

// Function to get contract instances
const getContract = async (contractAddress: string, abi: any) => {
    const signer = await getSigner();
    return new ethers.Contract(contractAddress, abi, signer);
};

// Export contract instances for frontend use
export const getResumeStorage = async () => getContract(resumeStorageAddress, ResumeStorageABI);
export const getResumeValidation = async () => getContract(resumeValidationAddress, ResumeValidationABI);
export const getResumeToken = async () => getContract(resumeTokenAddress, ResumeTokenABI);
export const getResumeAccessControl = async () => getContract(resumeAccessControlAddress, ResumeAccessControlABI);

// Function to connect wallet
export const connectWallet = async () => {
    if (!window.ethereum) throw new Error("MetaMask not found.");
    await window.ethereum.request({ method: "eth_requestAccounts" });
};

// Function to check wallet connection
export const getConnectedAccount = async () => {
    const provider = getProvider();
    const accounts = await provider.listAccounts();
    return accounts.length > 0 ? accounts[0] : null;
};
