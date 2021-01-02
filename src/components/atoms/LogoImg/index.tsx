import React from 'react';
import { ReactComponent as Logo } from '../../../img/logo.svg';
import './LogoImg.scss';

const LogoImg: React.FC = () => {
  return (
    <div id="logo_wrapper">
      <Logo />
    </div>
  );
};

export default LogoImg;
