use anchor_lang::prelude::*;
use anchor_lang::solana_program::program::invoke;
use mpl_token_metadata::instruction as mpl_instrucions;

pub mod contexts;
use contexts::*;

declare_id!("ApYM2yphUQFpDK4TBPeZoQQ6krXZKTUvHe8MUbgjy4Ny");
#[program]
pub mod mint_nft_token {
  use super::*;
  pub fn create_token(
    ctx: Context<CreateTokenContext>,
    name: String,
    symbol: String,
    uri: String
  ) -> Result<()> {
    // Create metadata account
    invoke(
      &mpl_instrucions::create_metadata_accounts_v3(
        ctx.accounts.metaplex_metadata_program_id.key(),
        ctx.accounts.metadata_account.key(),
        ctx.accounts.mint_account.key(),
        ctx.accounts.authority.key(),
        ctx.accounts.payer.key(),
        ctx.accounts.authority.key(),
        name,
        symbol,
        uri,
        None, // Creators
        0, // Seller fee basis points
        false, // Update authority is signer
        true, // Is mutable
        None, // Collection
        None, // Uses
        None // Collection Details
      ),
      &[
        ctx.accounts.metadata_account.to_account_info(),
        ctx.accounts.mint_account.to_account_info(),
        ctx.accounts.authority.to_account_info(),
        ctx.accounts.payer.to_account_info(),
        ctx.accounts.authority.to_account_info(),
        ctx.accounts.rent.to_account_info(),
      ]
    )?;
    msg!("NFT created successfully.");

    // Create master edition
    Ok(())
  }
}