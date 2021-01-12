import React from 'react';
import Progress from '../../atoms/Progress';
import BtnRowWrapper from '../../molecules/BtnRowWrapper';
import './ContentWrapper.scss';

interface Props {
  pageName?: string;
  progressValue?: number;
  progressDisabled?: boolean;
  content?: React.ReactNode;
  buttonsBottom?: React.ReactNode;
  buttonsBottomPosition?: "left" | "center" | "right";
}

const ContentWrapper: React.FC<Props> = ({
  pageName = "",
  progressValue,
  progressDisabled = false,
  content,
  buttonsBottom,
  buttonsBottomPosition = "center"
}) => {
  const classes: string[] = [];
  if (progressValue) classes.push("progress");

  const progress: React.ReactNode = (progressValue !== undefined) ?
    <Progress value={progressValue} max={100} disabled={progressDisabled} grow/> :
    <></> 
  const Buttons: React.ReactNode = (buttonsBottom !== undefined) ? buttonsBottom : <div></div>;

  return (
    <div id="wrapper">
      <div id="content_wrapper" className={classes.join(" ")}>
        {progress}
        <div id="content" className={pageName}>
          {content}
        </div>
      </div>
      <BtnRowWrapper position={buttonsBottomPosition}>
        {Buttons}
      </BtnRowWrapper>
    </div>
  );
}

export default ContentWrapper;
