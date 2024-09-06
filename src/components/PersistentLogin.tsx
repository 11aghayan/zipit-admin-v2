
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';


import useAuthContext from '@/hooks/useAuthContext';
import useRefreshToken from '@/hooks/useRefreshToken';

import Loader from './loader/Loader';


export default function PersistentLogin() {
  const { loggedIn } = useAuthContext();
  const refresh = useRefreshToken();
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const verifyToken = async () => {
      setLoading(true);
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    
    !loggedIn ? verifyToken() : setLoading(false);
    
  }, [loggedIn]);
  
  return (
    loading
    ?
    <Loader show={loading} position='fixed' />
    :
    <Outlet />
  );
}