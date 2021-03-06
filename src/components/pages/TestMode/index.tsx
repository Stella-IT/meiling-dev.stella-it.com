import React, { Fragment } from 'react';

import { getMeilingSessionToken } from '../../../common/';
import ContentWrapper from '../../templates/ContentWrapper';
import Btn from '../../atoms/Btn';
import './TestMode.scss';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps {
  
};

const TestMode: React.FC<Props> = () => {
  return (
    <Fragment>
      <ContentWrapper
        pageName="testmode"
        progressValue={1 / 10 * 100}
        content={
          <>
            <h1>테스트 모드</h1>
            <p>테스트 모드에 접속하셨습니다.</p>

            <h2>접속 가능한 페이지</h2>
            <div className='btn_column_wrapper'>
              <Btn to="signin" grow styleType="secondary">로그인</Btn>
              <Btn to="signout" grow styleType="secondary">로그아웃</Btn>
              <Btn to="socialsignin" grow styleType="secondary">소셜 계정으로 로그인</Btn>
              <Btn onClick={async () => {
                const localToken = localStorage.getItem('meiling-v1-token');
                try {
                  const token = await getMeilingSessionToken();
                  alert(`localStorage: ${localToken}

serverVersion: ${token}
isNewToken: ${token !== localToken}`);

                  const copyToClipboard = window.confirm("클립보드로 복사할까요?");
                  if (copyToClipboard) {
                    navigator.clipboard.writeText(token);
                    alert("클립보드로 복사되었습니다!");
                  }
                } catch (e) {
                  alert("Meiling API 서버와 통신에 실패 했습니다!");
                }
              }} grow styleType="secondary">메이링 서버 세션토큰 발급 테스트</Btn>
              <Btn href="https://github.com/Stella-IT/meiling-dev.stella-it.com" grow styleType="secondary">깃허브 레포지토리 접속</Btn>
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

export default TestMode;
