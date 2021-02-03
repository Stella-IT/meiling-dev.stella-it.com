import React from 'react';
import './ScopeListItem.scss';

interface Props {
  name?: string;
}

const ScopeItem: React.FC<Props> = ({
  name = ""
}) => {
  return <li className="scope_list_item">{name}</li>;
}

export default ScopeItem;
