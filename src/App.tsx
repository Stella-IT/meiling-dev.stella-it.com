import React from 'react';
import './style/_reset.scss';
import './style/_config.scss';

import Btn from './components/atoms/Btn';
import Progress from './components/atoms/Progress';
import Input from './components/atoms/Input';
import Caption from './components/atoms/Caption';

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
    </div>
  );
}

export default App;
