import React from 'react';
import '../css/styles.css';

const Marquee = () => {
  return (
    <marquee className="marquee" behavior="scroll" direction="left">
      5% DISCOUNT ON ALL ESPRESSO BAR DRINKS!!! BUY NOW!
    </marquee>
  );
};

export default Marquee;
