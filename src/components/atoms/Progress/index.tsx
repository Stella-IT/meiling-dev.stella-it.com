import React from 'react';
import './Progress.scss';

interface Props {
  children?: React.ReactNode;

  value?: number;
  max?: number;

  grow?: boolean;
  disabled?: boolean;
};

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

  return (
    <progress className={classes.join(" ")} value={value} max={max}>{children}</progress>
  )
}

export default Progress;
