import React from 'react';
import SelectAccountListItem, {SelectAccountListItemProps} from '../../atoms/SelectAccountListItem';
import AddAccountBtn from '../../atoms/AddAccountBtn';
import './SelectAccountList.scss';

interface Props {
  list?: SelectAccountListItemProps[];
  addAccountBtnTo?: string;
}

const SelectAccountList: React.FC<Props> = ({
  list = [],
  addAccountBtnTo = ''
}) => {
  return (
    <>
      <ul className="select_account_list">{list.map(item => <SelectAccountListItem key={item.username} {...item}/>)}</ul>
      {addAccountBtnTo !== '' && <AddAccountBtn to={addAccountBtnTo} />}
    </>
  );
}

export default SelectAccountList;
