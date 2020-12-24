import React from 'react';
import './TextArea.scss';

interface Props {
  children?: React.ReactNode;

  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => any;

  disabled?: boolean;
}

const TextArea: React.FC<Props> = ({
  children,

  placeholder = "",
  onChange,

  disabled = false,
  ...props
}) => {
  return (
    <textarea placeholder={placeholder} onChange={onChange} {...props}></textarea>
  );
}

export default TextArea;
