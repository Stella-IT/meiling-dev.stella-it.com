import React, { Fragment, useState, useEffect } from 'react';

import { getExtendedAuthenticationChallenge, getExtendedAuthenticationMethods } from '../../../common';
import ContentWrapper from '../../templates/ContentWrapper';
import { RouteComponentProps } from 'react-router-dom';
import Btn from '../../atoms/Btn';
import { MeilingV1ExtendedAuthMethods, MeilingV1SigninType } from '../../../common/interface/auth';
import { getMessageFromAuthenticationMethod} from '../../../common/auth';
import { getMessageFromMeilingV1Error, parseMeilingV1ErrorResponse } from '../../../common/error';

interface Props extends RouteComponentProps<{
  method: MeilingV1ExtendedAuthMethods;
}> {
  
};

const TwoFactor: React.FC<Props> = ({
  history,
  location,
  match,
}) => {
  const [loadState, setLoadState] = useState<{
    loaded: boolean;
    error?: string | boolean;
    methods?: [];
    challenge?: string;
  }>({
    loaded: false,
    error: undefined,
    methods: [],
    challenge: undefined,
  });
  const [authMethod, setAuthMethod] = useState<MeilingV1ExtendedAuthMethods|undefined>(match.params.method);

  useEffect(() => {
    if (!loadState.loaded) {
      if (!authMethod) {
        (async () => {
          try {
            const methods = await getExtendedAuthenticationMethods(
              MeilingV1SigninType.TWO_FACTOR_AUTH,
            );
            setLoadState({
              loaded: true,
              error: undefined,
              methods,
              challenge: undefined,
            });
          } catch(e) {
            const data = parseMeilingV1ErrorResponse(e);
            if (data) {
              setLoadState({
                loaded: true,
                error: getMessageFromMeilingV1Error(data),
                methods: [],
                challenge: undefined,
              });
            } else {
              setLoadState({
                loaded: true,
                error: true,
                methods: [],
                challenge: undefined,
              });
            }
          }
        })();
      } else {
        (async () => {
          try {
            const challenge = await getExtendedAuthenticationChallenge(
              MeilingV1SigninType.TWO_FACTOR_AUTH,
              authMethod,
            );
            setLoadState({
              loaded: true,
              error: false,
              methods: [],
              challenge: challenge,
            });
          } catch(e) {
            const data = parseMeilingV1ErrorResponse(e);
            if (data) {
              setLoadState({
                loaded: true,
                error: getMessageFromMeilingV1Error(data),
                methods: [],
                challenge: undefined,
              });
            } else {
              setLoadState({
                loaded: true,
                error: true,
                methods: [],
                challenge: undefined,
              });
            }
          }
        })();
      }
    }
  });

  let content: JSX.Element | undefined;

  if (!loadState.loaded) {
    content = <>
      <h1>2차 인증 정보를 불러오는 중 입니다.</h1>
      <p>잠시만 기다려 주세요.</p>
    </>;
  } else if (loadState.error) {
    if (loadState.error === true) {
      content = <>
        <h1>인증 서버와의 통신 중 장애가 발생했습니다.</h1>
        <p>Meiling API 가 온라인인지 확인하세요.</p>
      </>
    } else {
      content = <>
        <h1>오류 발생!</h1>
        <p>{loadState.error}</p>
      </>
    }
  }

  if (content) {
    return (
      <Fragment>
        <ContentWrapper
          pageName="index"
          progressValue={1 / 10 * 100}
          content={content}
          buttonsBottom={[]}
        />
      </Fragment>
    );
  }

  if (authMethod) {
    return (
      <Fragment>
        <ContentWrapper
          pageName="index"
          progressValue={1 / 10 * 100}
          content={
              <>
                <h1>2차 인증</h1>
                <h2>{getMessageFromAuthenticationMethod(authMethod)}</h2>
                <p>{loadState.challenge}</p>
              </>
          }
          buttonsBottom={[]}
        />
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <ContentWrapper
          pageName="index"
          progressValue={1 / 10 * 100}
          content={
            loadState.methods && loadState.methods?.length > 0 ? 
                <>
                  <h1>2차 인증</h1>
                  <p>이 계정은 2차 인증으로 보호되어 있습니다. 인증하실 수단을 선택하세요. (본 2차 인증 화면은 최종본이 아닙니다.)</p>
                  {loadState.methods?.map((method: MeilingV1ExtendedAuthMethods) => <Btn onClick={() => {
                    setAuthMethod(method);
                    setLoadState({
                      loaded: false,
                      error: false,
                      methods: [],
                      challenge: undefined,
                    })
                  }} styleType="secondary" grow>{getMessageFromAuthenticationMethod(method)}</Btn>)}
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
}

export default TwoFactor;
