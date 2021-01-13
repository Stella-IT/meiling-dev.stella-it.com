import { MeilingV1ErrorResponse, MeilingV1ErrorType } from "./interface/error";


export function parseMeilingV1ErrorResponse(e: any): MeilingV1ErrorResponse | undefined {
  if (e.response) {
    if (e.response.data) {
      return e.response.data;
    }
  }
  return undefined;
}

export function getMessageFromMeilingV1Error(e?: MeilingV1ErrorResponse) {
  if (e === undefined) {
    return "알 수 없는 오류가 발생했습니다.";
  }

  switch (e.type) {
    case MeilingV1ErrorType.ALREADY_SIGNED_IN:
      return "이미 로그인 되어 있습니다.";
    case MeilingV1ErrorType.ALREADY_SIGNED_OUT:
      return "이미 로그아웃 되어있습니다.";
    case MeilingV1ErrorType.AUTHENTICATION_NOT_CURRENT_CHALLENGE_METHOD:
      return "서버상의 인증시도와 이번 인증 시도가 일치하지 않습니다.";
    case MeilingV1ErrorType.AUTHENTICATION_REQUEST_NOT_GENERATED:
      return "정상적인 인증 시도가 생성되지 않았습니다.";
    case MeilingV1ErrorType.AUTHENTICATION_TIMEOUT:
      return "인증 제한시간이 초과되었습니다. 다시 시도하세요.";
    case MeilingV1ErrorType.INVALID_REQUEST:
      return "올바르지 않은 요청입니다.";
    case MeilingV1ErrorType.INVALID_SESSION:
      return "현재 세션이 올바르지 않습니다. 브라우저를 재시작 해 보세요.";
    case MeilingV1ErrorType.INVALID_SIGNIN_METHOD:
      return "지원하지 않는 인증 수단입니다.";
    case MeilingV1ErrorType.INVALID_SIGNIN_TYPE:
      return "지원하지 않는 로그인 방법입니다.";
    case MeilingV1ErrorType.MORE_THAN_ONE_USER_MATCHED:
      return "여러 계정에 해당되어, 로그인 할 수 없습니다. 아이디로 로그인해 보세요.";
    case MeilingV1ErrorType.NOT_IMPLMENETED:
      return "서버에서 아직 지원되지 않는 기능입니다.";
    case MeilingV1ErrorType.SIGNIN_FAILED:
      return "로그인을 실패했습니다.";
    case MeilingV1ErrorType.TWO_FACTOR_AUTHENTICATION_REQUEST_NOT_GENERATED:
      return "2차 인증 요청이 정상적으로 생성되지 않았습니다. 로그인을 다시 시도하세요.";
    case MeilingV1ErrorType.TWO_FACTOR_AUTHENTICATION_REQUIRED:
      return "2차 인증이 필요합니다.";
    case MeilingV1ErrorType.UNAUTHORIZED:
      return "접근 권한이 없습니다.";
    case MeilingV1ErrorType.UNSUPPORTED_SIGNIN_METHOD:
      return "지원 하지 않는 인증 수단입니다.";
    case MeilingV1ErrorType.WRONG_PASSWORD:
      return "비밀번호가 일치하지 않습니다.";
    case MeilingV1ErrorType.WRONG_USERNAME:
      return "아이디 또는 이메일이 일치하지 않습니다.";
    default:
      return `알 수 없는 오류 (${e.type}) 이 발생했습니다: ${e.description}`
  }
}
