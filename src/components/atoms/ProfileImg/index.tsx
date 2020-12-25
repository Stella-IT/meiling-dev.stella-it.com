import React from 'react';
import './ProfileImg.scss';

interface Props {
  alt?: string;
  src?: string;
  size?: "small" | "large";
}

const ProfileImg: React.FC<Props> = ({
  alt = "",
  src = "",
  size = "large",
  ...props
}) => {
  return (<img className={`profile_img ${size}`} src={src} alt={alt} {...props} />)
}

export default ProfileImg;
