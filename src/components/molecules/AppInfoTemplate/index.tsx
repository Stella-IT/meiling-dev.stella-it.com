import React from 'react';
import ProfileImg from '../../atoms/ProfileImg';
import TextLink from '../../atoms/TextLink';
import './AppInfo.scss';

interface Props {
  src?: string;
  appName?: string;
  privacyUrl? : string;
  termsUrl?: string;
}

const AppInfo: React.FC<Props> = ({
  src = "",
  appName = "",
  privacyUrl,
  termsUrl
}) => {
  return (
    <div className="app_info">
      <ProfileImg src={src} size="large"/>
      <p className="app_name">{appName}</p>
      <div className="textlink_wrapper">
        {privacyUrl !== undefined && <TextLink href={privacyUrl}>개인정보 취급방침</TextLink>}
        {termsUrl !== undefined && <TextLink href={termsUrl}>이용약관</TextLink>}
      </div>
    </div>
  );
}

export default AppInfo;
