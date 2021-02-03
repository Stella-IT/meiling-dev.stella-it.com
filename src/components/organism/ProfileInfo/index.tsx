import React, { useEffect } from 'react';
import { useState } from 'react';
import { getLoggedInUser } from '../../../common/';
import ProfileInfoTemplate from '../../molecules/ProfileInfoTemplate';

interface Props {
  uuid?: string;
  size?: "small" | "large";
}

const ProfileInfo: React.FC<Props> = ({
  uuid,
  size,
}) => {
  const [loadState, setLoadState] = useState<{
    loaded: boolean;
    error?: any;
    data?: any;
  }>({
    loaded: false,
    error: undefined,
    data: {
      name: '로딩 중'
    },
  });

  useEffect(() => {
    (async () => {
      if (!loadState.loaded) {
        try {
          if (!uuid) {
            return;
          }
          const userData = await getLoggedInUser(uuid);
          setLoadState({
            loaded: true,
            data: userData
          })
        } catch(e) {
          setLoadState({
            loaded: true,
            error: e,
            data: undefined
          });
        }
      }
    })();
  })
  
  if (loadState.loaded) {
    return (
      (!loadState.error) ? 
      <ProfileInfoTemplate 
        src={loadState.data.profileUrl}
        size={size}
        username={loadState.data.username}
        msg={loadState.data.emails[0]?.email}
      /> : <>
        <h1>에러남</h1>
        <p>콘솔 확인 하세요.</p>
        {console.log(loadState.error)}
      </>
    )
  } else {
    return (
      <> </>
    )
  }
}

export default ProfileInfo;
