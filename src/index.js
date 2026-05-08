//Importing dependencies
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//Defining the network
//Bitcoin - mainnet
//Testnet - test network
const network = bitcoin.networks.testnet

//Derivation of HD wallets
const path = `m/49'/1'/0'/0`

//Creating the mnemonic for the seed (password)
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//Creating the root of the HD wallet
let root = bip32.fromSeed(seed, network)

//Creating an account - pvt-pub pair keys
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Wallet generated")
console.log("Address: ", btcAddress)
console.log("Private key:", node.toWIF())
console.log("Seed:", mnemonic)