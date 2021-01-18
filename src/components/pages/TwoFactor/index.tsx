import React, { Fragment, useState, useEffect } from 'react';

import { getExtendedAuthenticationMethods } from '../../../common';
import ContentWrapper from '../../templates/ContentWrapper';
import { RouteComponentProps } from 'react-router-dom';
import Btn from '../../atoms/Btn';
import { MeilingV1SigninType } from '../../../common/interface/auth';
import { getMessageFromAuthenticationMethod} from '../../../common/auth';

interface Props extends RouteComponentProps<{
  method: string;
}> {
  
};

const TwoFactor: React.FC<Props> = ({
  location,
  match,
}) => {
  const authMethod = match.params.method;
  console.log(authMethod);

  const [loadState, setLoadState] = useState({
    loaded: false,
    error: false,
    methods: [],
  });

  useEffect(() => {
    if (!loadState.loaded) {
      (async () => {
        try {
          const methods = await getExtendedAuthenticationMethods(
            MeilingV1SigninType.TWO_FACTOR_AUTH,
          );
          setLoadState({
            loaded: true,
            error: false,
            methods,
          });
        } catch(e) {
          setLoadState({
            loaded: true,
            error: true,
            methods: [],
          });
        }
      })();
    }
  });

  let content: JSX.Element | undefined;

  if (!loadState.loaded) {
    content = <>
      <h1>2차 인증 정보를 불러오는 중 입니다.</h1>
      <p>잠시만 기다려 주세요.</p>
    </>;
  } else if (loadState.error) {
    content = <>
      <h1>인증 서버와의 통신 중 장애가 발생했습니다.</h1>
      <p>Meiling API 가 온라인인지 확인하세요.</p>
    </>
  }

  return (
    <Fragment>
      <ContentWrapper
        pageName="index"
        progressValue={1 / 10 * 100}
        content={
          content ? content :
            loadState.methods.length > 0 ? 
              <>
                <h1>2차 인증</h1>
                <p>이 계정은 2차 인증으로 보호되어 있습니다. 인증하실 수단을 선택하세요. (본 2차 인증 화면은 최종본이 아닙니다.)</p>
                {loadState.methods.map((method: any) => <Btn styleType="secondary" grow>{getMessageFromAuthenticationMethod(method)}</Btn>)}
              </> : 
              <>
                <h1>오류 발생!</h1>
                <p>이 계정의 2차 인증이 활성화 되어있지만, 사용 할 수 있는 2차 인증 수단이 존재하지 않습니다.</p>
                <p>로그인을 더 이상 진행 할 수 없습니다. 계정의 수동 복구가 필요합니다.</p>
                <p>Meiling API 운영자에게 문의하세요.</p>
              </>
        }
        buttonsBottom={[]}
      />
    </Fragment>
  );
}

export default TwoFactor;
