// Require MNEMONIC and INFURA_API_KEY
require("dotenv").config();
// Creates a connection with a wallet
const HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  networks: {
    // Development setting
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    // Kovan test network setting
    kovan: {
      provider: function() {
        // Rebuilds the wallet
        return new HDWalletProvider(
          process.env.MNEMONIC,
          `https://kovan.infura.io/${process.env.INFURA_API_KEY}`
        );
      },
      gas: 5000000,
      gasPrice: 25000000000,
      network_id: 42
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};
