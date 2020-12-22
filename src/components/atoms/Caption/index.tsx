import React from 'react';
import './Caption.scss';

interface Props {
  children?: React.ReactNode;

  grow?: boolean;
}

const caption: React.FC<Props> = ({
  children,

  grow
}) => {
  const classes: string[] = ["caption"];
  if (grow) classes.push("grow");

  return (<p className={classes.join(" ")}>{children}</p>);
};

export default caption;
