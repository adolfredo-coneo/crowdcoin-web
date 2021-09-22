import React from 'react';
import { Menu } from 'semantic-ui-react';

const Header = () => {
  return (
    <Menu>
      <Menu.Item name="home">CrowdCoin</Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item name="campaigns">Campaigns</Menu.Item>
        <Menu.Item name="create-campaign">+</Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
