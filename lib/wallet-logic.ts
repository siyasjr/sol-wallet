import * as bip39 from "bip39";
import nacl from "tweetnacl";
//import nacl from "tweetnacl";
//import { Keypair } from "@solana/web3.js";

export async function generateMnemonic(){
    const mnemonic = bip39.generateMnemonic(); // 12 word seed
    const seed = await bip39.mnemonicToSeed(mnemonic) //64 bytes

    const seedBuffer = seed.slice(0,32); // get first 32 bytes from seed
    const keypair = nacl.sign.keyPair.fromSeed(seedBuffer);  //EDDSA ED25519 curve


    const publicKey = Buffer.from(keypair.publicKey).toString('hex'); // convert pubkey to hex encoded string
    const privateKey = Buffer.from(keypair.secretKey).toString('hex'); // convert pvtkey to hex encoded string


    return { mnemonic, publicKey, privateKey } ;

};
