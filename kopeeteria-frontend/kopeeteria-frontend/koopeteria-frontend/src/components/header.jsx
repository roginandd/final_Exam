import React from 'react';
import '../css/styles.css';
import koopeteriaImage from '../assets/header-img.png'; // Image from static folder

const Header = () => {
  return (
    <header className="header">
      <img src={koopeteriaImage} alt="KopeeTearia" className="header-img" />
    </header>
  );
};

export default Header;
