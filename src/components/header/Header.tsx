import './Header.css';

import { useState } from 'react';

import Navbar from '../navbar/Navbar';
import { Icon } from '@iconify/react/dist/iconify.js';


export default function Header() {

  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleNavbarOpen = () => {setNavbarOpen(true)};
  const handleNavbarClose = () => {setNavbarOpen(false)};
  
  return (
    <header>
      <h1>
        <a href="/categories">ZIPIT.admin</a>
      </h1>
      <Navbar open={navbarOpen} handleClose={handleNavbarClose} />
      <button className='open-navbar' onClick={handleNavbarOpen}>
        <Icon icon='charm:menu-hamburger' />
      </button>
    </header>
  );
}