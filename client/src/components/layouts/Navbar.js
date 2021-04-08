import React from 'react';

const Navbar = () => {
  return (
    <div id='navbar'>
      <div id='home-icon'>
        <div id='home-icon-bot'></div>
        <div id='home-icon-circle'></div>
        <div id='home-icon-triangle'></div>
      </div>
      <div id='mode-toggle'>
        <img
          src={require('../../images/icon-moon.svg').default}
          alt='icon-moon'
        />
      </div>
      <div id='horizontal-line'></div>
      <div id='prof-pic'></div>
    </div>
  );
};

export default Navbar;
