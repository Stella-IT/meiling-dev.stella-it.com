import React, { useEffect } from 'react';
import { useState } from 'react';
import AppInfoTemplate from '../../molecules/AppInfoTemplate/';
import { getApplication } from '../../../common/';

interface Props {
  uuid?: string;
}

const AppInfo: React.FC<Props> = ({
  uuid,
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
          const appData = await getApplication(uuid);
          setLoadState({
            loaded: true,
            data: appData
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
  
  return (
    (!loadState.error) ? 
    <AppInfoTemplate
      src={loadState.data.image}
      appName={loadState.data.name}
      privacyUrl={loadState.data.privacy}
      termsUrl={loadState.data.terms}
    /> : <>
      <h1>에러남</h1>
      <p>콘솔 확인 하세요.</p>
      {console.log(loadState.error)}
    </>
  )
}

export default AppInfo;
