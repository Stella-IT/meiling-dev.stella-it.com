import React, { Fragment } from 'react';

import ContentWrapper from '../../templates/ContentWrapper';
import Btn from '../../atoms/Btn';

const SocialSignIn: React.FC = () => {
  return (
    <Fragment>
      <ContentWrapper
        progressDisabled
        content={
          <>
            <Btn>1</Btn>
            <Btn>2</Btn>
            <Btn>3</Btn>
            <Btn>4</Btn>
          </>
        }
        buttonsBottom={[
          <Btn styleType="secondary" to="/">아이디나 이메일로 로그인</Btn>
        ]}
        buttonsBottomPosition="left"
      />
    </Fragment>
  );
}

export default SocialSignIn;
