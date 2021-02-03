import React, { Fragment, useEffect, useState } from 'react';

import ContentWrapper from '../../templates/ContentWrapper';
import AppInfo from '../../organism/AppInfo';
import ProfileInfo from '../../organism/ProfileInfo';
import ScopeList from '../../molecules/ScopeList';
import Btn from '../../atoms/Btn';
import './AppAuth.scss';

import { Redirect, RouteComponentProps } from 'react-router-dom';
import { generateQueryUrl, getAuthentication, getLoggedInUsers, parseQueryUrl, deepCopyString } from '../../../common';
import { MeilingV1UserOAuthAuthQuery } from '../../../common/interface/oauth';
import { parseMeilingV1ErrorResponse } from '../../../common/error';
import { MeilingV1ErrorType } from '../../../common/interface/error';

interface Props extends RouteComponentProps<{

}> {

};

interface State {
  user_uuid?: string;
}

const AppAuth: React.FC<Props> = ({
  location,
  history,
}) => {
  const search = location.search;
  const searchObj = parseQueryUrl(search) as unknown as MeilingV1UserOAuthAuthQuery;

  const clientId = searchObj?.client_id;
  const scopes = searchObj?.scope;
  const redirectUri = searchObj?.redirect_uri;

  const [userUuid, setUserUuid] = useState<string|undefined>((location.state as State)?.user_uuid);
  console.log(userUuid);
  const [loadState, setLoadState] = useState<{
    loaded: boolean;
    error?: string | boolean;
  }>({
    loaded: false,
    error: undefined,
  });

  useEffect(() => {
    (async () => {
      if (!loadState.loaded) {
        if (!userUuid) {
          const users = await getLoggedInUsers();
          
          if (users.length > 0) {
            setUserUuid(users[0].id);
            return;
          } else {
            return <Redirect to={`/login?redirect_uri=${encodeURIComponent(window.location.href)}`} />;
          }
        } else {
          try {
            const response = await getAuthentication(userUuid, search, false);
            const queryString = generateQueryUrl(response);

            window.location.href = `${redirectUri}${queryString}`;
          } catch(e) {
            const data = parseMeilingV1ErrorResponse(e);
            if (data?.type !== MeilingV1ErrorType.APPLICATION_USER_ACTION_REQUIRED) {
              history.push(
                "/error",
                {
                  error: data,
                  redirect_uri: deepCopyString(window.location.href),
                }
              )
            }
          }
        }
        setLoadState({
          loaded: true,
          error: undefined,
        })
      }
    })();
  });

  if (!clientId || typeof scopes !== 'string' || !searchObj?.response_type) {
    // 일단 필수 조건이 없다.
    return <Redirect to={redirectUri ? redirectUri : "/"} />;
  }

  const authAction = async () => {
    if (!userUuid) {
      return;
    }

    try {
      const response = await getAuthentication(userUuid, search, true);
      const queryString = generateQueryUrl(response);

      window.location.href = `${redirectUri}${queryString}`;
    } catch(e) {
      const data = parseMeilingV1ErrorResponse(e);
      history.push(
        "/error",
        {
          error: data,
          redirect_uri: deepCopyString(window.location.href),
        }
      )
    }
  }

  return (
    <Fragment>
      <ContentWrapper
        pageName="app_auth"
        progressDisabled
        content={
          <>
            <AppInfo uuid={clientId} />
            <div className="paragraph_wrapper">
              <p>위 애플리케이션이 아래 계정과 연동하려 합니다.</p>
              <p>이 애플리케이션은 다음의 권한을 요청하고 있습니다.</p>
            </div>
            <ProfileInfo
              size="small"
              uuid={userUuid}
            />
            <ScopeList list={scopes !== undefined ? scopes.split(' ') : []} />
          </>
        }
        buttonsBottom={[
          <Btn onClick={() => {
            history.push(
              "/users",
              {
                redirect_uri: "/auth"+search,
              }
            )
          }} styleType="secondary">다른 계정으로 연동</Btn>,
          <Btn onClick={authAction}>연동</Btn>
        ]}
      />
    </Fragment>
  )
}

export default AppAuth;
