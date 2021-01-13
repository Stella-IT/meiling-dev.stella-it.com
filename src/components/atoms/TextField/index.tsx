import React from 'react';
import './TextField.scss';

interface Props {
  children?: React.ReactNode;

  type: "text" | "number" | "email" | "password";
  placeholder?: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => any;
  onEnter?: () => any;
  autoComplete?: string;

  readonly?: boolean;
  grow?: boolean;
  disabled?: boolean;
};

const TextField: React.FC<Props> = ({
  children,

  type,
  placeholder = "",
  onChange,
  onEnter,
  autoComplete,

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
      onKeyPress={
        (e) => {
          if (!e.shiftKey && e.key === "Enter") {
            if (onEnter) onEnter();
          }
        }
      }
      placeholder={placeholder}
      autoComplete={autoComplete}

      {...readonly}
      {...disabled}
      {...props}
    />
  )
}

export default TextField;
