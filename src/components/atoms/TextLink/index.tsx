import React from 'react';
import { Link } from 'react-router-dom';
import './TextLink.scss';

interface Props {
  children?: React.ReactNode;

  to?: string;
  href?: string;

  center?: boolean;
}

const TextLink: React.FC<Props> = ({
  children,

  to,
  href,

  center = false,
  ...props
}) => {
  if (to)
    return (<Link to={to} className="textlink" {...props}>
      {children}
    </Link>);
  
  return (<a href={href} className="textlink" {...props}>
    {children}
  </a>);
};

export default TextLink;
