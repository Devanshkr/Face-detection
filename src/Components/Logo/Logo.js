import React from 'react';
import Tilt from 'react-tilt';
import logo from './Logo.png';
import './Logo.css';

const Logo = () => {
  return (
    <div className='mt0 ma5'>
      <Tilt className="Tilt br2 shadow-2 " options={{ max: 155 }} style={{ height: 100, width: 100 }} >
        <div className="Tilt-inner pa3"> <img src={logo} alt='logo' /> </div>
      </Tilt>
    </div>
  );
}

export default Logo;