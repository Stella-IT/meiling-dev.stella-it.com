import React, { Fragment, useState, useEffect } from 'react';

import { getLoggedInUsers } from '../../../common';
import ContentWrapper from '../../templates/ContentWrapper';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import SelectAccountList from '../../molecules/SelectAccountList';

interface Props extends RouteComponentProps {
  
};

interface State {
  redirect_uri?: string;
}

const Users: React.FC<Props> = ({
  location,
  history,
}) => {
  const state = location.state as State;
  const redirect_uri = state?.redirect_uri ? state.redirect_uri : undefined;

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
      <h1>계정 정보를 불러오는 중 입니다.</h1>
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
                <h1>계정 선택</h1>
                <p>본 계정 선택 화면은 최종본이 아닙니다.</p>
                <SelectAccountList addAccountBtnTo={`/signin${location.search}`} list={loadState.users.map((user: any) => {
                  return {src: user.profileUrl, username: user.name, email: user.emails[0]?.email, id: user.id,
                    onClick: (redirect_uri) ? () => {
                      history.push(
                        redirect_uri,
                        {
                          user_uuid: user.id,
                        }
                      )
                    } : undefined,
                    to: (!redirect_uri) ? `/users/${user.id}` : undefined}
                })}/>
              </> : 
              <Redirect to={`/signin${location.search}`} />
        }
        buttonsBottom={[]}
      />
    </Fragment>
  );
}

export default Users;
