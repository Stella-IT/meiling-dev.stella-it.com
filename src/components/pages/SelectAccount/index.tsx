import React, { Fragment, useState, useEffect } from 'react';

import { getLoggedInUsers } from '../../../common';
import ContentWrapper from '../../templates/ContentWrapper';
import { Redirect, RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps {
  
};

const SelectAccount: React.FC<Props> = ({
  location
}) => {
  const [loadState, setLoadState] = useState({
    loaded: false,
    error: false,
    users: [],
  });

  useEffect(() => {
    if (!loadState.loaded) {
      (async () => {
        try {
          const users = await getLoggedInUsers();
          setLoadState({
            loaded: true,
            error: false,
            users,
          });
        } catch(e) {
          setLoadState({
            loaded: true,
            error: true,
            users: [],
          });
        }
      })();
    }
  });

  let content: JSX.Element | undefined;

  if (!loadState.loaded) {
    content = <>
      <h1>인증 서버와 통신 중 입니다.</h1>
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
            loadState.users.length > 0 ? 
              <>
                <h1>아직 구현 안된 로그인 된 계정 뭐시기 암튼 무언가!</h1>
              </> : 
              <Redirect to={`/login${location.search}`} />
        }
        buttonsBottom={[]}
      />
    </Fragment>
  );
}

export default SelectAccount;
