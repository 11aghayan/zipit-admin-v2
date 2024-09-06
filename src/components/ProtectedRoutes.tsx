
import useAuthContext from '@/hooks/useAuthContext';
import { Navigate, Outlet, useLocation } from 'react-router-dom';


export default function ProtectedRoutes() {
  const { pathname } = useLocation();
  const { loggedIn } = useAuthContext();

  
  return (
    <>
      {
        loggedIn
        ?
        <Outlet />
        :
        <Navigate to='/login' state={{ pathname }} />
      }
    </>
  );
}