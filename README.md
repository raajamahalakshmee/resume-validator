# Resume Validator Blockchain

This project is a blockchain-based resume validation system. It includes smart contracts for storing, validating, and managing resumes using Ethereum.

## Project Structure

```
Blockchain/
    .env
    .gitignore
    hardhat.config.js
    package.json
    README.md
    cache/
        solidity-files-cache.json
    contracts/
        Lock.sol
        ResumeAccessControl.sol
        ResumeStorage.sol
        ResumeToken.sol
        ResumeValidation.sol
    ignition/
        modules/
    scripts/
        deploy.js
    src/
        @openzeppelin/
        ...
    test/
Frontend/
    .gitignore
    components.json
    next-env.d.ts
    next.config.mjs
    package.json
    postcss.config.mjs
    tailwind.config.ts
    tsconfig.json
    .next/
    app/
    components/
    hooks/
    lib/
    public/
    styles/
```

## Prerequisites

- Node.js
- Hardhat
- Ethereum wallet (e.g., MetaMask)

## Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/raajamahalakshmee/resume-validator
    cd Blockchain
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Configure environment variables:
    - Create a `.env` file in the `Blockchain` directory.
    - Add your Ethereum wallet private key and Infura project ID:
        ```
        PRIVATE_KEY=<your-private-key>
        INFURA_PROJECT_ID=<your-infura-project-id>
        ```

## Deployment

To deploy the smart contracts, run the following command:

```sh
npx hardhat run scripts/deploy.js --network <network-name>
```

Replace `<network-name>` with the name of the network you want to deploy to (e.g., `rinkeby`, `mainnet`).

## Smart Contracts

The project includes the following smart contracts:

- `ResumeStorage.sol`: Manages the storage of resumes.
- `ResumeValidation.sol`: Handles the validation of resumes.
- `ResumeToken.sol`: Implements a token for resume validation.
- `ResumeAccessControl.sol`: Manages access control for the resume system.

## Scripts

- `deploy.js`: Script to deploy the smart contracts. It deploys the `ResumeStorage`, `ResumeValidation`, `ResumeToken`, and `ResumeAccessControl` contracts and logs their addresses.

## Testing

To run the tests, use the following command:

```sh
npx hardhat test
```

## License

This project is licensed under the MIT License.
