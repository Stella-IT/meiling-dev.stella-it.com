import React from 'react';
import './Input.scss';

interface Props {
  children?: React.ReactNode;

  type: "number" | "email";
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => any;

  grow?: boolean;
  disabled?: boolean;
};

const Input: React.FC<Props> = ({
  children,

  type,
  onChange,

  grow = false,
  disabled = false,
  ...props
}) => {
  const classes: string[] = [];
  if (grow) classes.push("grow");
  if (disabled) classes.push("disabled");

  return (
    <input className={classes.join(" ")} type={type} onChange={onChange}  />
  )
}

export default Input;
