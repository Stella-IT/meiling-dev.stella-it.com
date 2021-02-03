import { MeilingV1ErrorResponse, MeilingV1ErrorType } from "./interface/error";


export function parseMeilingV1ErrorResponse(e: any): MeilingV1ErrorResponse | undefined {
  if (e.response) {
    if (e.response.data) {
      return e.response.data;
    }
  }
  return undefined;
}

export function getMessageFromMeilingV1Error(data?: MeilingV1ErrorResponse) {
  if (data === undefined) {
    return "알 수 없는 오류가 발생했습니다.";
  }

  switch (data.type) {
    case MeilingV1ErrorType.TWO_FACTOR_AUTHENTICATION_REQUIRED:
      return "2차 인증이 필요합니다.";

    case MeilingV1ErrorType.AUTHENTICATION_REQUEST_NOT_GENERATED:
      return "인증 요청이 생성되지 않았습니다.";

    case MeilingV1ErrorType.AUTHENTICATION_NOT_CURRENT_CHALLENGE_METHOD:
      return "현재 사용되는 인증 방법이 아닙니다.";

    case MeilingV1ErrorType.TWO_FACTOR_AUTHENTICATION_REQUEST_NOT_GENERATED:
      return "2차 인증 요청이 생성되지 않았습니다.";

    case MeilingV1ErrorType.INVALID_REQUEST:
      return "올바르지 않은 요청입니다.";

    case MeilingV1ErrorType.INVALID_SIGNIN_METHOD:
      return "올바르지 않은 로그인 방법입니다.";

    case MeilingV1ErrorType.INVALID_SIGNIN_TYPE:
      return "올바르지 않은 로그인 종류입니다.";

    case MeilingV1ErrorType.ALREADY_SIGNED_IN:
      return "이미 이 계정으로 로그인 되어있습니다.";

    case MeilingV1ErrorType.ALREADY_SIGNED_OUT:
      return "이미 로그아웃 한 상태입니다.";

    case MeilingV1ErrorType.APPLICATION_REDIRECT_URI_INVALID:
      return "앱의 redirect_uri 값이 올바르지 않습니다.";

    case MeilingV1ErrorType.UNAUTHORIZED:
      return "권한이 없습니다.";

    case MeilingV1ErrorType.WRONG_USERNAME:
      return "사용자 이름이나 이메일이 틀렸습니다.";

    case MeilingV1ErrorType.WRONG_PASSWORD:
      return "비밀번호가 틀렸습니다.";

    case MeilingV1ErrorType.SIGNIN_FAILED:
      return "로그인에 실패하였습니다.";

    case MeilingV1ErrorType.INVALID_SESSION:
      return "올바르지 않은 세션입니다. 세션을 다시 발급 받기 위해 브라우저를 새로고침하세요.";

    case MeilingV1ErrorType.APPLICATION_NOT_AUTHORIZED_BY_USER:
      return "이 애플리케이션을 사용 할 수 없는 사용자 입니다.";

    case MeilingV1ErrorType.APPLICATION_NOT_AUTHORIZED_SCOPES:
      return "이 애플리케이션의 권한 부족으로, 이 권한을 위임 할 수 없습니다.";

    case MeilingV1ErrorType.APPLICATION_NOT_FOUND:
      return "이 애플리케이션을 찾을 수 없습니다.";

    case MeilingV1ErrorType.UNSUPPORTED_SIGNIN_METHOD:
      return "지원되지 않는 로그인 방법입니다.";

    case MeilingV1ErrorType.UNSUPPORTED_SCOPE:
      return "지원되지 않는 권한입니다.";

    case MeilingV1ErrorType.UNSUPPORTED_RESPONSE_TYPE:
      return "지원되지 않는 response_type 입니다.";

    case MeilingV1ErrorType.MORE_THAN_ONE_USER_MATCHED:
      return "로그인 할 수 있는 사용자가 한 명 이상입니다. 사용자이름/아이디로 다시 로그인 해 보세요.";

    case MeilingV1ErrorType.APPLICATION_USER_ACTION_REQUIRED:
      return "사용자 조작이 필요합니다.";

    case MeilingV1ErrorType.EXISTING_PASSWORD:
      return "이미 사용중인 비밀번호 입니다.";

    case MeilingV1ErrorType.AUTHENTICATION_TIMEOUT:
      return "시간초과 되었습니다.";

    case MeilingV1ErrorType.INTERNAL_SERVER_ERROR:
      return "서버 오류가 발생했습니다.";

    case MeilingV1ErrorType.NOT_IMPLEMENTED:
      return "서버에서 구현되지 않은 기능입니다.";

    case MeilingV1ErrorType.MEILING_OFFLINE:
      return "메이링 API가 오프라인 상태입니다."

    default:
      return `알 수 없는 오류 (${data.type}) 이 발생했습니다. ${data.description}`;
  }


}
