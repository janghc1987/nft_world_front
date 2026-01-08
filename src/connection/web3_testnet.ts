import Web3 from 'web3';
import HDWalletProvider from '@truffle/hdwallet-provider';

// Web 3 connection
let provider = new HDWalletProvider('5db3b020bec4bd4e5f0404d1ef9583e8752be8e9a9ec4279528d982bcf083df9', 'https://mainnet.infura.io/v3/af6a5e69a2ad41bfbb35ddab9298c69c')
const web3_testnet = new Web3(provider);

export default web3_testnet;