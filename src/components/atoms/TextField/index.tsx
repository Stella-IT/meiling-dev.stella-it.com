import React from 'react';
import './TextField.scss';

interface Props {
  children?: React.ReactNode;

  type: "text" | "number" | "email" | "password";
  placeholder?: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => any;

  readonly?: boolean;
  grow?: boolean;
  disabled?: boolean;
};

const TextField: React.FC<Props> = ({
  children,

  type,
  placeholder = "",
  onChange,

  readonly = false,
  grow = false,
  disabled = false,
  ...props
}) => {
  const classes: string[] = [];
  if (grow) classes.push("grow");

  return (
    <input
      className={classes.join(" ")}
      type={type}
      onChange={onChange}
      placeholder={placeholder}
      {...readonly}
      {...disabled}
      {...props}
    />
  )
}

export default TextField;
