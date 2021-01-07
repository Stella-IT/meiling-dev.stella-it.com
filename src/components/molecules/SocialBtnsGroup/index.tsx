import React from 'react';
import SocialBtn from '../../atoms/SocialBtn';
import './SocialBtnsGroup.scss';

const SocialBtnsGroup: React.FC = () => {
  return (
    <div className="social-buttons-group">
      <SocialBtn platform="github" href="#">1</SocialBtn>
      <SocialBtn platform="naver" href="#">1</SocialBtn>
      <SocialBtn platform="kakao" href="#">1</SocialBtn>
      <SocialBtn platform="google" href="#">1</SocialBtn>
    </div>
  );
}

export default SocialBtnsGroup;
