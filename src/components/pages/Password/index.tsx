import React, { useState } from 'react';
import { Location, History } from 'history';
import { Redirect } from 'react-router';

import ContentWrapper from '../../templates/ContentWrapper';
import ProfileInfo from '../../molecules/ProfileInfo';
import TextFieldWrapper from '../../molecules/TextFieldWrapper';
import TextLink from '../../atoms/TextLink';
import Btn from '../../atoms/Btn';
import './Password.scss';


interface Props {
  history: History;
  location: Location;
};

interface State {
  name?: string;
  username: string;
  profileUrl?: string;
};

const Password: React.FC<Props> = ({
  history,
  location,
}) => {
  type textFieldStatusTypes = "normal" | "positive" | "warning" | "negative";
  interface textFieldStatuses { userPassword: textFieldStatusTypes };

  const [userPassword, setUserPassword] = useState("");
  const [textFieldStatus, setTextFieldStatus] = useState<textFieldStatuses>({
    userPassword: "normal"
  });

  const name = (location.state as State)?.name;
  const username = (location.state as State)?.username;
  const profileUrl = (location.state as State)?.profileUrl;

  if (!username) {
    return <Redirect to={"/signin"}/>;
  }

  const checkPassword: () => void = () => {
    if (userPassword === "test") {
      setTextFieldStatus({userPassword: "positive"});
      return ;
    }
    setTextFieldStatus({userPassword: "negative"});
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
          <TextFieldWrapper
            type="password"
            status={textFieldStatus.userPassword}
            onChange={e => {
              setUserPassword(e.target.value);
              setTextFieldStatus({userPassword: "normal"});
            }}
            placeholder="비밀번호를 입력하세요."
            caption={(textFieldStatus.userPassword === "negative") ? "비밀번호가 틀렸습니다." : ""}
          />
          <TextLink to="find-password">비밀번호를 잊으셨나요?</TextLink>
          <TextLink to="find-password">비밀번호 없이 로그인합니다.</TextLink>
        </>
      }
      buttonsBottom={[
        <Btn styleType="secondary" to="signin">이전</Btn>,
        <Btn onClick={checkPassword}>다음</Btn>
      ]}
    />
  );
};

export default Password;
