import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import classes from './Header.module.css';

const Header = () => {
  return (
    <div className={classes.header}>
      <Menu>
        <Link className="item" to="/">
          CrowdCoin
        </Link>

        <Menu.Menu position="right">
          <Link className="item" to="/">
            Campaigns
          </Link>
          <Link className="item" to="/campaigns/new">
            +
          </Link>
        </Menu.Menu>
      </Menu>
    </div>
  );
};

export default Header;
