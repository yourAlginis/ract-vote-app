import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const FooterNav = ({
  className,
  ...props
}) => {

  const classes = classNames(
    'footer-nav',
    className
  );

  return (
    <nav
      {...props}
      className={classes}
    >
      <ul className="list-reset">
      <li>
         <Link to="/"  >Home</Link>
       </li>
       <li>
         <Link to="/voting"  >Ballot Voting</Link>
       </li>
       <li>
          <Link to="/payment"  >Payment Dapp</Link>
       </li>
      </ul>
    </nav>
  );
}

export default FooterNav;