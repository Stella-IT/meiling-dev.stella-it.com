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
    users: [],
  });

  useEffect(() => {
    if (!loadState.loaded) {
      (async () => {
        try {
          const users = await getLoggedInUsers();
          setLoadState({
            loaded: true,
            users,
          });
        } catch(e) {
          // error!
        }
      })();
    }
  });

  return (
    <Fragment>
      <ContentWrapper
        pageName="index"
        progressValue={1 / 10 * 100}
        content={
          <>
            {
              loadState.loaded ? (
                loadState.users.length > 0 ? 
                  <>
                    <h1>아직 구현 안된 로그인 된 계정 뭐시기 암튼 무언가!</h1>
                  </> : 
                  <Redirect to={`/login${location.search}`} />
              ) : <>
                <h1>서버랑 통신 중!</h1>
              </>
            }
          </>
        }
        buttonsBottom={[]}
      />
    </Fragment>
  );
}

export default SelectAccount;
