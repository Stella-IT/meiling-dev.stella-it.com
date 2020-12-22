import React from 'react';
import './BtnRowWrapper.scss';

interface Props {
  children?: React.ReactNode;
  position?: "left" | "center" | "right";
}

const BtnRowWrapper: React.FC<Props> = ({
  children,
  position = "center",
  ...props
}) => {
  const classes: string[] = [ "btn_row_wrapper" ];
  if (React.Children.count(children) <= 1)
    classes.push(position);

  return (<div className={classes.join(" ")} {...props}>
    {children}
  </div>)
}

export default BtnRowWrapper;
