import React from 'react';
import './SocialBtn.scss';

interface Props {
  children?: React.ReactNode;
  platform?: string;
  href?: string;
}

const SocialBtn: React.FC<Props> = ({
  children,
  platform,
  href,
  ...props
}) => {
  return (<a className={`social-button ${platform}`} href={href} {...props}>
    {children}
  </a>);
};

export default SocialBtn;
