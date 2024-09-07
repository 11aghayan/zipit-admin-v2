import './Navbar.css';

import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import navRoutes from '@/util/navRoutes';
import { Icon } from '@iconify/react/dist/iconify.js';
import { logout } from '@/api/auth';
import useAuthContext from '@/hooks/useAuthContext';
import useScreen from '@/hooks/useScreen';
import CloseBtn from '../close-btn/CloseBtn';

type Props = {
  open: boolean;
  handleClose: () => void;
}

export default function Navbar({ open, handleClose }: Props) {
  const { screen } = useScreen();
  const { setAuth } = useAuthContext();
  const navigate = useNavigate();
  const exactPathname = useLocation().pathname;
  const currentPathname = '/' + (useLocation().pathname.split('/')[1] || '');
  const [logoutLoading, setLogoutLoading] = useState(false);
  
  const handleLogout = async () => {
    try {
      setLogoutLoading(true);
      await logout();
    } catch (error) {
      console.error(error);
    } finally {
      setAuth({ accessToken: '', loggedIn: false });
      navigate('login', { state: { pathname : currentPathname} });
      setLogoutLoading(false);
    }
  };
  
  const handleSamePageClose = (shouldClose: boolean) => {
    if (shouldClose) handleClose();
  }
  
  return (
    <nav className={open ? 'open' : ''}>
      <CloseBtn handleClose={handleClose} hide={screen !== 'sm'} icon='arrow-right' />
      <ul>
        {
          navRoutes.map(({ label, pathname }) => (
            <li 
              key={pathname} 
              className={currentPathname === pathname ? 'active' : ''}
              onClick={() => handleSamePageClose(exactPathname === pathname)}
            >
              <a className={exactPathname === pathname ? 'disabled' : ''} href={pathname}>{label}</a>
            </li>
          ))
        }
      </ul>
      <div className='buttons'>
        <div 
          onClick={() => handleSamePageClose(exactPathname === '/settings')}
        >
          <a 
            href='/settings' 
            className={`settings-btn ${currentPathname === '/settings' ? 'disabled' : ''}`}  
          >
            <Icon icon='mingcute:settings-2-line' />
          </a>
        </div>
        <button className='logout-btn' onClick={handleLogout} disabled={logoutLoading}>
          <Icon icon='mdi:logout' />
        </button>
      </div>
    </nav>
  );
}