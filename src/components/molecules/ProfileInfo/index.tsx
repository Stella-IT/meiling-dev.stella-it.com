import React from 'react';
import ProfileImg from '../../atoms/ProfileImg';
import './ProfileInfo.scss';

interface Props {
  src?: string;
  size?: "small" | "large";
  msg?: string;
  email?: string;
}

const ProfileInfo: React.FC<Props> = ({
  src = "",
  size = "large",
  msg,
  email
}) => {
  const classes: string[] = [ "profile_info", size ];
  if (msg) classes.push("msg");

  return (
    <div className={classes.join(" ")}>
      <ProfileImg src={src} size={size}/>
      {msg !== undefined ? <p className="msg">{msg}</p> : <></>}
      {email !== undefined ? <p className="email">{email}</p> : <></>}
    </div>
  );
}

export default ProfileInfo;
