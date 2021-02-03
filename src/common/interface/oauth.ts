export enum OAuth2QueryResponseType {
  CODE = 'code',
  TOKEN = 'token',
}
export type OAuth2QueryAccessType = 'online' | 'offline';
export enum OAuth2QueryGrantType {
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
  AUTHORIZATION_CODE = 'authorization_code',
  // SAML_BEARER = 'urn:ietf:params:oauth:grant-type:saml2-bearer',
}

export type OAuth2QueryBoolean = 'true' | 'false';
export type OAuth2QueryPrompt = 'none' | 'consent' | 'select_account';

export type OAuth2QueryCodeChallengeMethod = 'S256' | 'plain';

export interface MeilingV1UserOAuthAuthQuery {
  // oAuth parameters
  access_type?: OAuth2QueryAccessType;
  client_id: string;
  scope: string;
  response_type: OAuth2QueryResponseType;
  redirect_uri: string;
  include_granted_scopes?: OAuth2QueryBoolean;
  prompt?: OAuth2QueryPrompt;
  code_challenge?: string;
  code_challenge_method?: OAuth2QueryCodeChallengeMethod;
  state?: string;
  nonce?: string;
}
