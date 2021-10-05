import React from 'react';

import classes from './Footer.module.css';

const Header = () => {
  return (
    <div className={classes.footer}>
      ©Copyright 2021 by{' '}
      <a
        href="https://adolconeo.com/"
        target="_blank"
        rel="noreferrer"
        className="font-black"
      >
        <span className="text-yellow-400">&#123; </span>adolConeo
        <span className="text-yellow-400"> &#125;</span>
      </a>
      . All rights reserved.
    </div>
  );
};

export default Header;
