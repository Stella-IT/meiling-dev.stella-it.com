import React from 'react';
import { ReactComponent as Logo } from '../../../img/logo.svg';
import Progress from '../../atoms/Progress';
import BtnRowWrapper from '../../molecules/BtnRowWrapper';
import './ContentWrapper.scss';

interface Props {
  progressValue?: number;
  progressDisabled?: boolean;
  content?: React.ReactNode;
  ButtonsBottom?: React.ReactNode;
}

const ContentWrapper: React.FC<Props> = ({
  progressValue,
  progressDisabled = false,
  content,
  ButtonsBottom
}) => {
  const classes: string[] = [];
  if (progressValue) classes.push("progress");

  const progress: React.ReactNode = (progressValue !== undefined) ?
    <Progress value={progressValue} max={100} disabled={progressDisabled} grow/> :
    <></> 
  const Buttons: React.ReactNode = (ButtonsBottom !== undefined) ? ButtonsBottom : <div></div>;

  return (
    <div id="wrapper">
      <Logo />
      <div id="content_wrapper" className={classes.join(" ")}>
        {progress}
        <div id="content">
          {content}
        </div>
      </div>
      <BtnRowWrapper>
        {Buttons}
      </BtnRowWrapper>
    </div>
  );
}

export default ContentWrapper;
