import React, { useContext } from 'react';
import DarkContext from '../../context/dark/darkContext';

const Navbar = () => {
  const darkContext = useContext(DarkContext);
  const { dark, toggleDarkMode } = darkContext;

  return (
    <div id='navbar' className={dark && 'dark'}>
      <div id='home-icon'>
        <div id='home-icon-bot'></div>
        <div id='home-icon-circle'></div>
        <div id='home-icon-triangle'></div>
      </div>
      <div id='mode-toggle' onClick={toggleDarkMode}>
        {dark ? (
          <img
            src={require('../../images/icon-sun.svg').default}
            alt='icon-sun'
          />
        ) : (
          <img
            src={require('../../images/icon-moon.svg').default}
            alt='icon-moon'
          />
        )}
      </div>
      <div id='horizontal-line'></div>
      <div id='prof-pic'></div>
    </div>
  );
};

export default Navbar;
