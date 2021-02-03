import React from 'react';
import { Link } from 'react-router-dom';
import './AddAccountBtn.scss';

interface Props {
  to?: string;
}

const AddAccountBtn: React.FC<Props> = ({
  to = ""
}) => {
  return (
    <div className="add_account_btn">
      <Link to={to}>+ 계정 추가</Link>
    </div>
  );
}

export default AddAccountBtn;
