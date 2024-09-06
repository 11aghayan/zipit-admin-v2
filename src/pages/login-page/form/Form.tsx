import './Form.css';

import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

import useAuthContext from '@/hooks/useAuthContext';
import { login } from '@/api/auth';


export default function Form() {
  const { setAuth } = useAuthContext();
  const navigate = useNavigate();
  const { state } = useLocation();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordType, setPasswordType] = useState<'password' | 'text'>('password');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const icon = passwordType === 'text' ? 'fluent:eye-off-20-regular' : 'fluent:eye-20-regular';
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setError(null);
      setLoading(true);

      const res = await login({ username, password });
      if (!res) {
        setError('Server Side Error');
        return;
      }
  
      if (!res?.ok) {
        setError('Wrong credentials');
        return;
      }
  
      if (res?.ok) {
        setAuth({ accessToken: res?.accessToken, loggedIn: true });
        navigate(state?.pathname || '/categories', { replace: true });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (setMethod: typeof setUsername) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setMethod(e.target.value);
    }
  };
  
  return (
    <form className='login-form' onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input name='username' id='username' type="text" required={true} value={username} onChange={handleInputChange(setUsername)} disabled={loading} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <div className='password-input-div'>
          <input name='password' id='password' type={passwordType} required={true} value={password} onChange={handleInputChange(setPassword)} disabled={loading} />
          <button type='button' className='password-visible' onTouchStart={() => setPasswordType('text')} onTouchEnd={() => setPasswordType('password')} onMouseDown={() => setPasswordType('text')} onMouseUp={() => setPasswordType('password')}>
            <Icon icon={icon} />
          </button>
        </div>
      </div>
      {error ? <p className='error-msg'>{error}</p> : null}
      <button className='submit-btn' disabled={loading}>
        Login
      </button>
    </form>
  );
}