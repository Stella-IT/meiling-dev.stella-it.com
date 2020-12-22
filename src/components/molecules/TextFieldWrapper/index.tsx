import React from 'react';
import TextField from './../../atoms/TextField';
import Caption from './../../atoms/Caption';
import './TextFieldWrapper.scss';

interface Props {
  type?: "text" | "number" | "email" | "password";
  status?: "normal" | "positive" | "warning" | "negative";
  width?: "half" | "full"; 

  caption?: string;
}

const TextFieldWrapper: React.FC<Props> = ({
  type = "text",
  status = "normal",
  width = "full",
  caption = "",
  ...props
}) => {
  return (<div className={`textfield_wrapper ${status} ${width}`} {...props}>
    <TextField grow type={type} onChange={e => {console.log(e.target.value)}} />
    <Caption>{caption}</Caption>
  </div>);
}

export default TextFieldWrapper;
