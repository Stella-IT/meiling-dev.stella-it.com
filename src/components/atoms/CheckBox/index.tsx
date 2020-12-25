import React from 'react';
import './CheckBox.scss';

interface Props {
  name?: string;
  value?: string;
  label?: string;
  status?: "normal" | "positive" | "warning" | "negative";

  checked?: boolean;
  disabled?: boolean;
}

const CheckBox: React.FC<Props> = ({
  name = "",
  value = "",
  label = "",
  status = "normal",
  
  checked = false,
  disabled = false
}) => {
  return (
    <label className={`checkbox ${status}`}>
      <input type="checkbox" id={`checkbox_${name}`} name={name} value={value} defaultChecked={checked} disabled={disabled} />
      <span>{label}</span>
    </label>
  );
}

export default CheckBox;
