
# Voting
Web App which allows users to register, vote registered users, and record the transactions to a local blockchain or Kovan Test Network.

## Dependencies
- NPM: https://nodejs.org
- Truffle: https://github.com/trufflesuite/truffle
- Ganache: http://truffleframework.com/ganache/
- Metamask: https://metamask.io/
- Infura: https://infura.io/

## Step 1. Clone the project
`git clone https://github.com/franpas12123/voting`

## Step 2. Install dependencies
```
$ cd voting
$ npm install
```

## Step 3. Start Ganache
Open the Ganache GUI client. This will start your local blockchain instance.
Change the file name of "env" to ".env". Add your MNEMONIC phrase from Ganache to the MNEMONIC variable of ".env". Add your Infura API key to INFURA_API_Key variable. You have to register to Infura to get your Infura API key

## Step 4. Compile & Deploy Smart Contract
`$ truffle migrate --reset`
You must migrate the smart contract each time your restart ganache.

## Step 5. Configure Metamask
- Unlock Metamask
- Connect metamask the local Etherum blockchain provided by Ganache.
- Import an account provided by ganache.

## Step 6. Run the Front End Application
`$ npm run dev`
