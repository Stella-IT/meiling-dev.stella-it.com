import React from 'react';
import './TextField.scss';

interface Props {
  children?: React.ReactNode;

  type: "text" | "number" | "email" | "password";
  placeholder?: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => any;

  grow?: boolean;
  disabled?: boolean;
};

const Input: React.FC<Props> = ({
  children,

  type,
  placeholder = "",
  onChange,

  grow = false,
  disabled = false,
  ...props
}) => {
  const classes: string[] = [];
  if (grow) classes.push("grow");

  return (
    <input className={classes.join(" ")} type={type} onChange={onChange} placeholder={placeholder} {...disabled} {...props} />
  )
}

export default Input;
