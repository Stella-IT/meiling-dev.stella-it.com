import React from 'react';
import ProfileImg from '../../atoms/ProfileImg';
import './ProfileInfo.scss';

interface Props {
  src?: string;
  size?: "small" | "large";
  msg?: string;
  username?: string;
}

const ProfileInfo: React.FC<Props> = ({
  src = "",
  size = "large",
  msg,
  username
}) => {
  const classes: string[] = [ "profile_info", size ];
  if (msg) classes.push("msg");

  return (
    <div className={classes.join(" ")}>
      <ProfileImg src={src} size={size}/>
      {msg !== undefined ? <p className="msg">{msg}</p> : <></>}
      {username !== undefined ? <p className="username">{username}</p> : <></>}
    </div>
  );
}

export default ProfileInfo;
