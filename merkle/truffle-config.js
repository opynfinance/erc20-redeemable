/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * truffleframework.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like truffle-hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

require("dotenv").config();

const HDWalletProvider = require("@truffle/hdwallet-provider");
const fs = require("fs");
const ganacheMnemonic = fs.readFileSync("../.secret", "utf-8");
const infuraKey = process.env.INFURA_KEY;
const etherscanKey = process.env.ETHERSCAN_API;

module.exports = {
  networks: {
    kovan: {
      provider: () => {
        return new HDWalletProvider(
          ganacheMnemonic,
          `https://kovan.infura.io/v3/${infuraKey}`
        );
      },
      network_id: 42
    },
    mainnet: {
      provider: () => {
        return new HDWalletProvider(
          ganacheMnemonic,
          `https://mainnet.infura.io/v3/${infuraKey}`
        );
      },
      network_id: 1,
      gasPrice: 200000000000, // 80 gwei
      gas: 3000000
    }
  },
  mocha: {
    reporter: "eth-gas-reporter",
    reporterOptions: {
      currency: "USD",
      gasPrice: 50
    }
  },
  compilers: {
    solc: {
      version: "0.6.8" // Fetch exact version from solc-bin (default: truffle's version)
    }
  },
  plugins: ["truffle-plugin-verify"],
  api_keys: {
    etherscan: etherscanKey
  }
};
