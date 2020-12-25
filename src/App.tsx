import React from 'react';
import './style/_reset.scss';
import './style/_config.scss';

import Btn from './components/atoms/Btn';
import Progress from './components/atoms/Progress';
import Input from './components/atoms/TextField';
import Caption from './components/atoms/Caption';
import TextLink from './components/atoms/TextLink';
import TextArea from './components/atoms/TextArea';
import BtnRowWrapper from './components/molecules/BtnRowWrapper';
import TextFieldWrapper from './components/molecules/TextFieldWrapper';
import ProfileInfo from './components/molecules/ProfileInfo';
import CheckBox from './components/atoms/CheckBox';

/**
 * 
      {["Primary", "Secondary", "Tertiary"].map(n => <Btn href="/" styleType={n.toLowerCase() as any}>{n} Button Here</Btn>)}<br />
      {["Primary", "Secondary", "Tertiary"].map(n => <Btn disabled href="/" styleType={n.toLowerCase() as any}>{n} Button Here</Btn>)}<br />
      <Btn grow onClick={() => console.log("Dummy")} disabled>asdf</Btn>
      <Progress max={100} value={50} grow />
 */

function App() {
  return (
    <div className="App">
      <div>
        {["Primary", "Secondary", "Tertiary"].map((n, i) => <Btn key={i} href="/" styleType={n.toLowerCase() as any}>{n} Button Here</Btn>)}<br />
      </div>
      <div>
        {["Primary", "Secondary", "Tertiary"].map((n, i) => <Btn key={i} href="/" styleType={n.toLowerCase() as any} disabled>{n} Button Here</Btn>)}<br />
      </div>
      <Btn grow onClick={() => console.log("Dummy")} disabled>asdf</Btn>
      <Progress max={100} value={13} grow />
      <Progress max={100} value={72} grow disabled />
      <Input type="email" onChange={(a) => {console.log(a.target.value)}} placeholder="anggggg" />
      <Input type="email" onChange={(a) => {console.log(a.target.value)}} grow />
      <Caption>Caption here.</Caption>
      <TextLink href="#">TextLink here.</TextLink>
      <TextArea placeholder={"wa\nsans\n\nwanna have a bad tom?"} onChange={(a) => {console.log(a.target.value)}} />
      <BtnRowWrapper position="center">
        <Btn>Hello!</Btn>
      </BtnRowWrapper>
      <TextFieldWrapper width="half" status="positive" caption="Caption Here">
      </TextFieldWrapper>
      <ProfileInfo size="small" src="https://placehold.it/48x48" msg="테스트입니다." email="Your E-mail Here"></ProfileInfo>
      <CheckBox label="Label Here."/>
      <CheckBox checked label="Label Here."/>
      <CheckBox disabled label="Label Here."/>
      <CheckBox disabled checked label="Label Here."/>
    </div>
  );
}

export default App;
