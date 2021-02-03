import React from 'react';
import { Link } from 'react-router-dom';
import './Btn.scss';

interface Props {
  children?: React.ReactNode;
  styleType?: "primary" | "secondary" | "tertiary";

  to?: string;
  href?: string;
  onClick?: () => void;

  grow?: boolean;
  isSquare?: boolean;
  disabled?: boolean;
}

const Btn: React.FC<Props> = ({
  children,
  styleType = "primary",
  to,
  href,
  grow = false,
  isSquare = false,
  disabled = false,
  ...props
}) => {
  const classes: string[] = [ 'btn', styleType ];
  if (grow) classes.push("grow");
  if (isSquare) classes.push("square");

  if ((to && disabled) || (href && disabled)) {
    classes.push("disabled");
    return (<button className={classes.join(" ")} disabled {...props}>
      {children}
    </button>)
  } else if (to) {
    return (<Link to={to} className={classes.join(" ")} {...props}>
      {children}
    </Link>);
  } else if (href) {
    return (<a href={href} className={classes.join(" ")} {...props}>
      {children}
    </a>);
  }
  return (<button className={classes.join(" ")} disabled={disabled} {...props}>
    {children}
  </button>);
}

export default Btn;
