import React, { Fragment, useState, useEffect } from 'react';

import { getLoggedInUser } from '../../../common';
import ContentWrapper from '../../templates/ContentWrapper';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import ProfileInfoTemplate from '../../molecules/ProfileInfoTemplate';

interface UserInfoState {
  user_id?: string;
}

interface Props extends RouteComponentProps<{
  user_id?: string
}> {
  
};

const UserInfo: React.FC<Props> = ({
  location,
  match
}) => {
  const [loadState, setLoadState] = useState({
    loaded: false,
    error: false,
    user: undefined,
  });

  const state = location.state as UserInfoState;
  const user_id = state?.user_id ? state?.user_id : match.params?.user_id;

  useEffect(() => {
    if (!loadState.loaded) {
      (async () => {
        try {
          const user = await getLoggedInUser(user_id);
          setLoadState({
            loaded: true,
            error: false,
            user: user,
          });
        } catch(e) {
          setLoadState({
            loaded: true,
            error: true,
            user: undefined,
          });
        }
      })();
    }
  });


  if (!user_id) {
    return <Redirect to={"/"}/>;
  }

  let content: JSX.Element | undefined;

  if (!loadState.loaded) {
    content = <>
      <h1>계정 정보를 불러오는 중 입니다.</h1>
      <p>잠시만 기다려 주세요.</p>
    </>;
  } else if (loadState.error) {
    content = <>
      <h1>인증 서버와의 통신 중 장애가 발생했습니다.</h1>
      <p>Meiling API 가 온라인인지 확인하세요.</p>
    </>
  }

  const user = loadState.user as any;

  return (
    <Fragment>
      <ContentWrapper
        pageName="index"
        progressValue={1 / 10 * 100}
        content={
          content ? content :
            user ? 
              <>
                <ProfileInfoTemplate
                  size="large"
                  src={`${(user.profileUrl !== undefined) ? user.profileUrl : "https://placehold.it/128x128"}`}
                  msg={`${(user.name !== undefined) ? ` ${user.name}`:''}`}
                  username={user.username}
                />
                <p>계정 생성 일자: {user.createdAt}</p>
                <p>계정 로그인 일자: {user.lastSignIn}</p>
                <p>계정 인증 일자: {user.lastAuthenticated}</p>

              </> : 
              <Redirect to={`/`} />
        }
        buttonsBottom={[]}
      />
    </Fragment>
  );
}

export default UserInfo;
