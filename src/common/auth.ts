import { MeilingV1ExtendedAuthMethods } from "./interface/auth";

export function getMessageFromAuthenticationMethod(method?: MeilingV1ExtendedAuthMethods) {
  if (method === undefined) {
    return "알 수 없는 수단";
  }

  switch (method) {
    case MeilingV1ExtendedAuthMethods.EMAIL:
      return "이메일";
    case MeilingV1ExtendedAuthMethods.OTP:
      return "OTP";
    case MeilingV1ExtendedAuthMethods.PGP_SIGNATURE:
      return "PGP 전자서명";
    case MeilingV1ExtendedAuthMethods.SECURITY_KEY:
      return "보안키";
    case MeilingV1ExtendedAuthMethods.SMS:
      return "문자";
    default:
      return `알 수 없는 수단 (${method})`
  }
}
