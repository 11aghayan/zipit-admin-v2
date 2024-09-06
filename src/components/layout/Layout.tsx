import './Layout.css';

import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import useScreen from '@/hooks/useScreen';
import Header from '../header/Header';
import { Toaster } from 'react-hot-toast';


export default function Layout() {
  const { pathname } = useLocation();
  const { screen } = useScreen();
  const navigate = useNavigate();
    
  useEffect(() => {
    if (pathname === '/') {
      navigate('/categories', { replace: true })
    }

    if (screen === 'sm' && pathname === '/endpoints') {
      navigate('/categories', { replace: true });
    }
  }, [pathname, screen])
  
  return (
    <div className='general-layout'>
      <Toaster />
      <Header />
      <Outlet />
    </div>
  );
}