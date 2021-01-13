import React, { Fragment, useState, useEffect } from 'react';

import { getLoggedInUsers } from '../../../common/';
import ContentWrapper from '../../templates/ContentWrapper';
import { Redirect, RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps {
  
};

const Index: React.FC<Props> = ({
  location
}) => {
  const [loadState, setLoadState] = useState({
    loaded: false,
    loggedIn: false,
    commsFailed: false,
  });

  useEffect(() => {
    if (!loadState.loaded) {
      (async () => {
        try {
          const data = await getLoggedInUsers();
          setLoadState({
            loaded: true,
            loggedIn: (data) ? data.length > 0 : false,
            commsFailed: false,
          });
        } catch(e) {
          if (e.response) {
            setLoadState({
              loaded: true,
              loggedIn: false,
              commsFailed: false,
            });
          } else {
            setLoadState({
              loaded: false,
              loggedIn: false,
              commsFailed: true,
            });
          }
        }
      })();
    }
  });

  if (loadState.loaded) {
    
    if (loadState.loggedIn) {
      return <Redirect to={`/selectaccount${location.search}`} />
    } else {
      return <Redirect to={`/signin${location.search}`} />
    }

  } else {

    return (
      <Fragment>
        <ContentWrapper
          pageName="index"
          progressValue={1 / 10 * 100}
          content={
            (loadState.commsFailed) ?
            <>
              <h1>인증 서버와의 통신 중 장애가 발생했습니다.</h1>
              <p>Meiling API 가 온라인인지 확인하세요.</p>
            </>
            :
            <>
              <h1>인증 서버와 통신 중 입니다.</h1>
              <p>잠시만 기다려 주세요.</p>
            </>
          }
          buttonsBottom={[]}
        />
      </Fragment>
    );

  }
}

export default Index;
