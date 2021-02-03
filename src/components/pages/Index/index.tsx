import React, { Fragment, useState, useEffect } from 'react';

import { getLoggedInUsers, deepCopyString } from '../../../common/';
import ContentWrapper from '../../templates/ContentWrapper';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { MeilingV1ErrorType } from '../../../common/interface/error';

interface Props extends RouteComponentProps {
  
};

const Index: React.FC<Props> = ({
  location,
  history,
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
            history.push(
              "/error",
              {
                error: {
                  type: MeilingV1ErrorType.MEILING_OFFLINE,
                },
                redirect_uri: deepCopyString(window.location.href),
              }
            )
          }
        }
      })();
    }
  });

  if (loadState.loaded) {
    
    if (loadState.loggedIn) {
      return <Redirect to={`/users${location.search}`} />
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
