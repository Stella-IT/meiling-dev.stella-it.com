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
  });

  useEffect(() => {
    if (!loadState.loaded) {
      (async () => {
        try {
          const data = await getLoggedInUsers();
          setLoadState({
            loaded: true,
            loggedIn: (data) ? data.length > 0 : false,
          });
        } catch(e) {
          if (e.response) {
            setLoadState({
              loaded: true,
              loggedIn: false,
            });
          } else {
            setLoadState({
              loaded: false,
              loggedIn: false,
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
