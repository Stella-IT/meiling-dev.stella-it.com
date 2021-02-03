import React from 'react';
import { Link } from 'react-router-dom';
import './SelectAccountListItem.scss';

export interface SelectAccountListItemProps {
  src?: string;
  username?: string;
  email?: string;
  to?: string;
  onClick?: () => void;
}

const SelectAccountListItem: React.FC<SelectAccountListItemProps> = ({
  src = "",
  username = "",
  email = "",
  to,
  onClick = () => {}
}) => {
  if (to) {
    return (
      <li className="select_account_item">
        <Link to={to}>
          <img alt={`${username} 프로필 사진`} src={src} />
          <span>
            <span>{username}</span>
            <span>{email}</span>
          </span>
        </Link>
      </li>
    );
  }
  return (
    <li className="select_account_item">
      <button onClick={onClick}>
        <img alt={`${username} 프로필 사진`} src={src} />
        <span>
          <span>{username}</span>
          <span>{email}</span>
        </span>
      </button>
    </li>
  )
}

export default SelectAccountListItem;
