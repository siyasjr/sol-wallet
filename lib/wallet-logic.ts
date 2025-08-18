import * as bip39 from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";

export async function generateSolanaHDWallet() {
  // 1. Generate a 12-word mnemonic
  const mnemonic = bip39.generateMnemonic();

  // 2. Convert mnemonic to seed (64 bytes)
  const seed = await bip39.mnemonicToSeed(mnemonic);

  // 3. Derive path using SLIP-0010 for Ed25519
  // Standard Solana path: m/44'/501'/0'/0'
  const path = `m/44'/501'/0'/0'`;
  const derivedSeed = derivePath(path, seed.toString("hex")).key;

  // 4. Generate keypair from derived seed
  const keypair = nacl.sign.keyPair.fromSeed(derivedSeed);

  const publicKey = Buffer.from(keypair.publicKey).toString("hex");
  const privateKey = Buffer.from(keypair.secretKey).toString("hex");

  return { mnemonic, path, publicKey, privateKey };
}

// Example usage:
generateSolanaHDWallet().then(console.log);
