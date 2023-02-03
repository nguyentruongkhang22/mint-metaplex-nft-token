import {
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
  SYSVAR_INSTRUCTIONS_PUBKEY,
  Keypair,
  SYSVAR_RENT_PUBKEY
} from '@solana/web3.js';
import { BN, Idl } from '@project-serum/anchor';
import {
  IdlParserService,
  HashService,
  MerkleNode,
  BufferLayoutService,
  TOKEN_PROGRAM_ID,
} from '@coin98/solana-support-library';
import { PROGRAM_ID } from '@metaplex-foundation/mpl-token-metadata';


import MintNftToken from "../target/idl/mint_nft_token.json";
const parser = new IdlParserService(MintNftToken as Idl) as any;

export class DemoTokenInstruction {
  static createTokenInstruction(
    name: string,
    symbol: string,
    uri: string,
    payer: PublicKey,
    metadataAccount: PublicKey,
    mint: PublicKey,
    authority: PublicKey,
    demoTokenProgramId: PublicKey
  ): TransactionInstruction {
    const metaplexMetadataProgramId = PROGRAM_ID;
    return parser.createToken(
      {
        name,
        symbol,
        uri
      },
      {
        payer,
        metaplexMetadataProgramId,
        metadataAccount,
        mintAccount: mint,
        authority,
        rent: SYSVAR_RENT_PUBKEY,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID
      },
      demoTokenProgramId
    )
  }
}