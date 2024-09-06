import './LoginPage.css';

import { Navigate, useLocation } from 'react-router-dom';

import useAuthContext from '@/hooks/useAuthContext';
import Form from './form/Form';


export default function LoginPage() {
  const { state } = useLocation();
  const { loggedIn } = useAuthContext();
  
  return (
    loggedIn 
    ?
    <Navigate to={state?.pathname || '/categories'} replace={true} />
    :
    <main className='login-page'>
      <h1>ZIPIT</h1>
      <Form />
    </main>
  );
}