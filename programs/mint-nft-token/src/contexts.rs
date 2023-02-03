use anchor_lang::prelude::*;
use anchor_spl::token;

#[derive(Accounts)]
pub struct CreateTokenContext<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  /// CHECK: Metaplex will check this
  #[account(mut)]
  pub metaplex_metadata_program_id: UncheckedAccount<'info>,

  /// CHECK: 
  #[account(mut)]
  pub metadata_account: UncheckedAccount<'info>,

  #[account(mut)]
  pub mint_account: Account<'info, token::Mint>,
  pub authority: SystemAccount<'info>,

  pub rent: Sysvar<'info, Rent>,
  pub system_program: Program<'info, System>,
  pub token_program: Program<'info, token::Token>,
}