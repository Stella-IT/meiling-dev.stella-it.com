export enum MeilingV1SigninType {
  USERNAME_CHECK = 'username_check',
  USERNAME_AND_PASSWORD = 'username_and_password',
  TWO_FACTOR_AUTH = 'two_factor_authentication',
  PASSWORDLESS = 'passwordless',
}

export enum MeilingV1ExtendedAuthMethods {
  PGP_SIGNATURE = 'pgp_signature',
  OTP = 'otp',
  SMS = 'sms',
  EMAIL = 'email',
  SECURITY_KEY = 'security_key',
}
