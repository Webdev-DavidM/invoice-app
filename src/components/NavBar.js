import React from 'react';
import { InvoiceContext } from '../App';

export default function NavBar() {
  return (
    <div className='navbar-flex-container'>
      <div className='logo-container'>
        <img src={`${process.env.PUBLIC_URL}/assets/logo.svg`} alt='' />
        <div className='nested-purple-pattern'></div>
      </div>

      <div className='day-or-night-btn'>
        <img src={`${process.env.PUBLIC_URL}/assets/icon-moon.svg`} alt='' />
      </div>
      <div className='avatar-container'>
        <img src={`${process.env.PUBLIC_URL}/assets/image-avatar.jpg`} alt='' />
      </div>
    </div>
  );
}
