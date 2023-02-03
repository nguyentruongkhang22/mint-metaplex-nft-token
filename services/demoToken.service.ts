import { Connection, Keypair, PublicKey, Transaction } from "@solana/web3.js";
import { PROGRAM_ID as TOKEN_METADATA_PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";

import { DemoTokenInstruction } from "./instructions.service";
import { sendTransaction } from "@coin98/solana-support-library";

// const DEMO_TOKEN_PROGRAM_ID = 

export class DemoTokenServices {
  static async createToken(
    connection: Connection,
    name: string,
    symbol: string,
    uri: string,
    payer: Keypair,
    mint: Keypair,
    authority: PublicKey,
    demoTokenProgramId: PublicKey
  ): Promise<string> {
    const transaction: Transaction = new Transaction();
    const [metadataAccount] = this.findMetadataAccount(mint.publicKey);

    transaction.add(
      DemoTokenInstruction.createTokenInstruction(
        name,
        symbol,
        uri,
        payer.publicKey,
        metadataAccount,
        mint.publicKey,
        authority,
        demoTokenProgramId,
      )
    )

    return await sendTransaction(connection, transaction, [mint, payer]);
  }

  static findMetadataAccount(mintAddress: PublicKey): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
      [
        Buffer.from('metadata'),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        mintAddress.toBuffer()
      ], TOKEN_METADATA_PROGRAM_ID
    )
  }
}