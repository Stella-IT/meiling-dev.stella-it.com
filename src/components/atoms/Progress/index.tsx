import React from 'react';
import './Progress.scss';

interface Props {
  children?: React.ReactNode;

  value?: number;
  max?: number;

  grow?: boolean;
  disabled?: boolean;
};

const localizedProgressString = "진행 완료.";
const localizedDisabledString = "비활성화됨.";

const Progress: React.FC<Props> = ({
  children,

  value,
  max,

  grow = false,
  disabled = false,
  ...props
}) => {
  const classes: string[] = [];
  if (grow) classes.push("grow");
  if (disabled) classes.push("disabled");

  let percentage = undefined;
  if (value !== undefined && max !== undefined) percentage = 100 * (value / max);
  
  const progressBarLabel = ""
    + ((percentage !== undefined) ? percentage.toPrecision(2) + "% "+localizedProgressString : "")
    + ((disabled) ? " "+localizedDisabledString : "");

  return (
    <progress className={classes.join(" ")} value={value} max={max} aria-label={progressBarLabel}>{progressBarLabel} {children}</progress>
  )
}

export default Progress;
