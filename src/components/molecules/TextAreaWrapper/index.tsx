import React from 'react';
import TextArea from '../../atoms/TextArea';
import Caption from '../../atoms/Caption';
import './TextAreaWrapper.scss';

interface Props {
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => any;
  caption?: string;

  status?: "normal" | "positive" | "warning" | "negative";
  disabled?: boolean;
}

const TextAreaWrapper: React.FC<Props> = ({
  placeholder = "",
  onChange,
  caption = "",

  status = "normal",
  disabled = false,
  ...props
}) => {
  return (
    <div className={`textarea_wrapper ${status}`} {...props}>
      <TextArea placeholder={placeholder} onChange={e => {console.log(e.target.value)}} {...disabled} />
      <Caption>{caption}</Caption>
    </div>
  )
}

export default TextAreaWrapper;
