import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import classes from './Header.module.css';

const Header = () => {
  return (
    <div className={classes.header}>
      <Menu>
        <Menu.Item name="home">
          <Link to="/">CrowdCoin</Link>
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item name="campaigns">Campaigns</Menu.Item>
          <Menu.Item name="create-campaign">+</Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  );
};

export default Header;
