import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { DemoTokenServices } from '../services/demoToken.service';
import { SolanaConfigService, TestAccountService } from '@coin98/solana-support-library/config';
import { TokenProgramService } from '@coin98/solana-support-library';

const DEMO_PROGRAM_ID = new PublicKey('ApYM2yphUQFpDK4TBPeZoQQ6krXZKTUvHe8MUbgjy4Ny');
const connection: Connection = new Connection('http://localhost:8899', 'confirmed');

describe("mint-nft-token", () => {
  // Configure the client to use the local cluster.
  let ownerAccount: Keypair;
  let tokenMint: Keypair;
  before(async () => {
    ownerAccount = await SolanaConfigService.getDefaultAccount();
    tokenMint = Keypair.generate();
    await TokenProgramService.createTokenMint(
      connection,
      ownerAccount,
      tokenMint,
      0,
      ownerAccount.publicKey,
      ownerAccount.publicKey
    );
  })

  it("Is initialized!", async () => {
    // Add your test here.
    console.log('yes')
    await DemoTokenServices.createToken(
      connection,
      "Name",
      "N",
      'https://bafybeibh7jov6vmqo76ycnihairv7sqnblg74isi5ei32afp3zsfkch2li.ipfs.nftstorage.link/1510.json',
      ownerAccount,
      tokenMint,
      ownerAccount.publicKey,
      DEMO_PROGRAM_ID
    )
  });
});
