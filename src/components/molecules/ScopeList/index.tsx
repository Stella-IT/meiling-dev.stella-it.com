import React from 'react';
import ScopeListItem from '../../atoms/ScopeListItem';
import './ScopeList.scss';

interface Props {
  list?: string[];
}

const ScopeList: React.FC<Props> = ({
  list = [""]
}) => {
  return (
    <ul className="scope_list">{list.map(item => <ScopeListItem name={item}/>)}</ul>
  );
}

export default ScopeList;
