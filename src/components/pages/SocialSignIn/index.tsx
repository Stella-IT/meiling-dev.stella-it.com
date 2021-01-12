import React, { Fragment } from 'react';

import ContentWrapper from '../../templates/ContentWrapper';
import Btn from '../../atoms/Btn';
import SocialBtnsGroup from '../../molecules/SocialBtnsGroup';

const SocialSignIn: React.FC = () => {
  return (
    <Fragment>
      <ContentWrapper
        pageName="socialsignin"
        progressDisabled
        content={<SocialBtnsGroup />}
        buttonsBottom={[
          <Btn styleType="secondary" to="/signin">아이디나 이메일로 로그인</Btn>
        ]}
        buttonsBottomPosition="left"
      />
    </Fragment>
  );
}

export default SocialSignIn;
