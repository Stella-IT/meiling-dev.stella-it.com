import React, { Fragment, useState } from 'react';

import ContentWrapper from '../../templates/ContentWrapper';
import TextFieldWrapper from '../../molecules/TextFieldWrapper';
import TextLink from '../../atoms/TextLink';
import Btn from '../../atoms/Btn';
import './Index.scss';

const Index: React.FC = () => {
  type textFieldStatusTypes = "normal" | "positive" | "warning" | "negative";
  interface textFieldStatuses { userId: textFieldStatusTypes };

  const [userId, setUserId] = useState("");
  const [textFieldStatus, setTextFieldStatus] = useState<textFieldStatuses>({
    userId: "normal"
  });

  const checkUserId: () => void = () => {
    if (userId === "test") {
      setTextFieldStatus({userId: "positive"});
      return;
    }
    setTextFieldStatus({userId: "negative"});
  }

  return (
    <Fragment>
      <ContentWrapper
        progressValue={1 / 3 * 100}
        content={
          <>
            <TextFieldWrapper
              type="text"
              status={textFieldStatus.userId}
              onChange={(e) => {
                setUserId(e.target.value);
                setTextFieldStatus({userId: "normal"});
              }}
              placeholder="아이디 또는 이메일을 입력하세요."
              caption={(
                (textFieldStatus.userId === "negative") ? "존재하지 않는 계정입니다." : ""
              )}
            />
            <TextLink to="signup">계정이 없으신가요?</TextLink>
          </>
        }
        buttonsBottom={[
          <Btn styleType="secondary" to="socialsignin">소셜 계정으로 로그인</Btn>,
          <Btn onClick={checkUserId}>다음</Btn>
        ]}
      />
    </Fragment>
  );
}

export default Index;
