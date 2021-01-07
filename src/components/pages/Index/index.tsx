import React, { Fragment } from 'react';

import ContentWrapper from '../../templates/ContentWrapper';
import Btn from '../../atoms/Btn';
import './Index.scss';

const Index: React.FC = () => {
  return (
    <Fragment>
      <ContentWrapper
        progressValue={1 / 10 * 100}
        content={
          <>
            <h1>테스트 모드</h1>
            <p>테스트 모드에 접속하셨습니다.</p>

            <h2>접속 가능한 페이지</h2>
            <Btn to="signin" grow styleType="secondary">로그인</Btn>
            <Btn to="socialsignin" grow styleType="secondary">소셜 계정으로 로그인</Btn>
          </>
        }
        buttonsBottom={[
          <Btn styleType="secondary" href="https://opensource.stella-it.com/developers/">개발자 리소스</Btn>,
          <Btn to="signin">로그인</Btn>
        ]}
      />
    </Fragment>
  );
}

export default Index;
