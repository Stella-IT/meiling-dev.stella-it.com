import React from 'react';
import './ProfileImg.scss';

interface Props {
  src?: string;
  size?: "small" | "large";
}

const ProfileImg: React.FC<Props> = ({
  src,
  size = "large",
  ...props
}) => {
  return (<img className={`profile_img ${size}`} src={src} {...props} />)
}

export default ProfileImg;
