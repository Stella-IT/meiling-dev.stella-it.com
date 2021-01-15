import React, { useState } from 'react';
import { Redirect } from 'react-router';

import ContentWrapper from '../../templates/ContentWrapper';
import ProfileInfo from '../../molecules/ProfileInfo';
import TextFieldWrapper from '../../molecules/TextFieldWrapper';
import TextLink from '../../atoms/TextLink';
import Btn from '../../atoms/Btn';
import './Password.scss';
import { signInWithUsernameAndPassword, parseQueryUrl } from '../../../common';
import { getMessageFromMeilingV1Error, parseMeilingV1ErrorResponse } from '../../../common/error';
import { RouteComponentProps } from 'react-router-dom';
import { MeilingV1ErrorType } from '../../../common/interface/error';

interface Props extends RouteComponentProps {
  
};

interface State {
  name?: string;
  username: string;
  profileUrl?: string;
};

const Password: React.FC<Props> = ({
  location,
  history,
}) => {
  type textFieldStatusTypes = "normal" | "positive" | "warning" | "negative";
  interface textFieldStatuses { 
    password: {
      status: textFieldStatusTypes,
      message: string
    } 
  };

  const [password, setPassword] = useState("");
  const [textFieldStatus, setTextFieldStatus] = useState<textFieldStatuses>({
    password: {
      status: "normal",
      message: "",
    }
  });

  const name = (location.state as State)?.name;
  const username = (location.state as State)?.username;
  const profileUrl = (location.state as State)?.profileUrl;

  if (!username) {
    return <Redirect to={"/signin"}/>;
  }

  const checkPassword: () => Promise<void> = async () => {
    let query;
    try {
      query = await signInWithUsernameAndPassword(username, password);
    } catch(e) {
      if (e.response) {
        const result = parseMeilingV1ErrorResponse(e);
        setTextFieldStatus({
          password: {
            status: 'negative',
            message: getMessageFromMeilingV1Error(result),
          }
        });

        if (result) {
          if (result.type === MeilingV1ErrorType.TWO_FACTOR_AUTHENTICATION_REQUIRED) {
            history.push({
              pathname: "/2fa",
              search: location.search,
            });
          }
        }
      } else {
        setTextFieldStatus({
          password: {
            status: 'negative',
            message: 'Meiling API 서버와의 통신에 실패 했습니다.',
          }
        });
      }

      return;
    }
    
    if (query.success) {
      const data = parseQueryUrl(location?.search);
      const redirectUri = data.find(n => n.name === "redirect_uri");

      let redirectTo = "/";

      if (redirectUri && redirectUri.value) {
        redirectTo = redirectUri.value;
      }

      window.location.href = redirectTo;
    } else {
      setTextFieldStatus({
        password: {
          status: 'negative',
          message: '알 수 없는 오류가 발생했습니다.',
        }
      });
    }
  };

  return (
    <ContentWrapper
      pageName="password"
      progressValue={2 / 3 * 100}
      content={
        <>
          <ProfileInfo
            size="large"
            src={`${(profileUrl !== undefined) ? profileUrl : "https://placehold.it/128x128"}`}
            msg={`환영합니다.${(name !== undefined) ? ` ${name} 님.`:''}`}
            username={username}
          />

          <input className="hidden" autoComplete="username email" value={username} readOnly />
          <TextFieldWrapper
            type="password"
            status={textFieldStatus.password.status}
            onChange={e => {
              setPassword(e.target.value);
              setTextFieldStatus({password: { status: "normal", message: ""} });
            }}
            onEnter={checkPassword}
            placeholder="비밀번호를 입력하세요."
            caption={textFieldStatus.password.message}
            autoComplete="password"
          />
          <TextLink to="find-password">비밀번호를 잊으셨나요?</TextLink>
          <TextLink to="find-password">비밀번호 없이 로그인합니다.</TextLink>
        </>
      }
      buttonsBottom={[
        <Btn styleType="secondary" to={`signin${location.search}`}>이전</Btn>,
        <Btn onClick={checkPassword}>다음</Btn>
      ]}
    />
  );
};

export default Password;
