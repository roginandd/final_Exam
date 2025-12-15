import React from 'react';
import '../css/styles.css';
import bannerImage from '../assets/menu.png'; // Your drink choices image

const Banner = () => {
  return (
    <div className="banner">
      <img src={bannerImage} alt="Drinks Banner" className="banner-img" />
    </div>
  );
};

export default Banner;
