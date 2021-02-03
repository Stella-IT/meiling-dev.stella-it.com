import React, { Fragment, useState, useEffect } from 'react';

import { signout, parseQueryUrl } from '../../../common';
import ContentWrapper from '../../templates/ContentWrapper';
import { Redirect, RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps {
  
};

const SignOut: React.FC<Props> = ({
  location
}) => {
  const [loadState, setLoadState] = useState({
    loaded: false,
    error: false,
  });

  useEffect(() => {
    if (!loadState.loaded) {
      (async () => {
        try {
          let uuid = undefined;
          let redirectTo = "/"
          if (location.search) {
            const parsedData = parseQueryUrl(location.search);
            const uuidData = parsedData.uuid;
            const redirectData = parsedData['redirect_uri'];

            if (uuidData) {
              uuid = uuidData;
            }

            if (redirectData) {
              redirectTo = redirectData;
            }
          }

          await signout(uuid);
          setLoadState({
            loaded: true,
            error: false,
          });

          window.location.href = redirectTo;
        } catch(e) {
          setLoadState({
            loaded: true,
            error: true,
          });
        }
      })();
    }
  });

  let content: JSX.Element | undefined;

  if (!loadState.loaded) {
    content = <>
      <h1>로그아웃 하는 중 입니다.</h1>
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
              <Redirect to={`/${location.search}`} />
        }
        buttonsBottom={[]}
      />
    </Fragment>
  );
}

export default SignOut;
