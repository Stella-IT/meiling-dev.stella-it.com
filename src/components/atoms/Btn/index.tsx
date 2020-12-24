import React from 'react';
import { Link } from 'react-router-dom';
import './Btn.scss';

interface Props {
  children?: React.ReactNode
  styleType?: "primary" | "secondary" | "tertiary";

  to?: string;
  href?: string;
  onClick?: () => void;

  grow?: boolean;
  disabled?: boolean;
}

const Btn: React.FC<Props> = ({
  children,
  styleType = "primary",
  to,
  href,
  grow = false,
  disabled = false,
  ...props
}) => {
  const classes: string[] = [ styleType ];
  if (grow) classes.push("grow");

  if ((to && disabled) || (href && disabled)) {
    classes.push("button disabled");
    return (<span className={classes.join(" ")} {...props}>
      {children}
    </span>)
  } else if (to) {
    classes.push("button");
    return (<Link to={to} className={classes.join(" ")} {...props}>
      {children}
    </Link>);
  } else if (href) {
    classes.push("button");
    return (<a href={href} className={classes.join(" ")} {...props}>
      {children}
    </a>);
  }
  return (<button className={classes.join(" ")} {...disabled} {...props}>
    {children}
  </button>);
}

export default Btn;
