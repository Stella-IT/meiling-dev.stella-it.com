import React, { Fragment } from 'react';

import { getMeilingSessionToken } from '../../../common/';
import ContentWrapper from '../../templates/ContentWrapper';
import Btn from '../../atoms/Btn';
import './TestMode.scss';

const Index: React.FC = () => {
  return (
    <Fragment>
      <ContentWrapper
        pageName="index"
        progressValue={1 / 10 * 100}
        content={
          <>
            <h1>테스트 모드</h1>
            <p>테스트 모드에 접속하셨습니다.</p>

            <h2>접속 가능한 페이지</h2>
            <div className='btn_column_wrapper'>
              <Btn to="signin" grow styleType="secondary">로그인</Btn>
              <Btn to="socialsignin" grow styleType="secondary">소셜 계정으로 로그인</Btn>
              <Btn to="password" grow styleType="secondary">패스워드 입력</Btn>
              <Btn onClick={async () => {
                console.log("working on it!");
                const token = await getMeilingSessionToken();

                alert(token);
              }} grow styleType="secondary">메이링 서버 세션토큰 발급 테스트</Btn>
            </div>
          </>
        }
        buttonsBottom={[
          <Btn key="button_developers" styleType="secondary" href="https://opensource.stella-it.com/developers/">개발자 리소스</Btn>,
          <Btn key="button_signin" to="signin">로그인</Btn>
        ]}
      />
    </Fragment>
  );
}

export default Index;
