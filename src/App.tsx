import React from 'react';
import './style/_reset.scss';
import './style/_config.scss';

import ContentWrapper from './components/templates/ContentWrapper';
import Btn from './components/atoms/Btn';
import ProfileInfo from './components/molecules/ProfileInfo';

/**
 * 
      {["Primary", "Secondary", "Tertiary"].map(n => <Btn href="/" styleType={n.toLowerCase() as any}>{n} Button Here</Btn>)}<br />
      {["Primary", "Secondary", "Tertiary"].map(n => <Btn disabled href="/" styleType={n.toLowerCase() as any}>{n} Button Here</Btn>)}<br />
      <Btn grow onClick={() => console.log("Dummy")} disabled>asdf</Btn>
      <Progress max={100} value={50} grow />
 */

function App() {
  return (
    <ContentWrapper
      progressValue={50}
      content={
        <ProfileInfo size="small" src="https://placehold.it/48x48" msg="테스트입니다." email="Your E-mail Here"></ProfileInfo>
      }
      ButtonsBottom={
        [<Btn>Hello!</Btn>, <Btn>Hello!</Btn>, <Btn>Hello!</Btn>]
      }
    />
  );
}

export default App;
