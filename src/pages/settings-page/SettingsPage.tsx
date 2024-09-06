import './SettingsPage.css';

import { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

import type { ChangingPasswordBodyType } from '@/types/AuthTypes';
import { changePassword } from '@/api/auth';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import toast from 'react-hot-toast';


export default function SettingsPage() {
  const [oldPwdType, setOldPwdType] = useState<'password' | 'text'>('password');
  const [newPwdType, setNewPwdType] = useState<'password' | 'text'>('password');
  const [newPwdRptType, setNewPwdRptType] = useState<'password' | 'text'>('password');
  const [oldPwd, setOldPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [newRptPwd, setNewRptPwd] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const axios = useAxiosPrivate();
  
  const icon = (type: 'text' | 'password') => {
    return type === 'text' ? 'fluent:eye-off-20-regular' : 'fluent:eye-20-regular';
  };
  
  const handleChange = (setValue: React.Dispatch<React.SetStateAction<string>>) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setError('');
    setIsLoading(true);
    const body: ChangingPasswordBodyType = {
      password: oldPwd,
      newPassword: newPwd,
      newPasswordRepeat: newRptPwd
    };

    const res = await changePassword(axios, body);

    if (!res.ok) {
      setError(res.msg!);
    } else {
      toast.success('Գաղտնաբառը հաջողությամբ փոխվել է');
      setOldPwd('');
      setNewPwd('');
      setNewRptPwd('');
    }
    
    setIsLoading(false);
  };
  
  return (
    <main className='settings-page'>
      <form onSubmit={handleSubmit}>
        <div className='top'>
          <div className='input-container'>
            <label htmlFor="old-pwd">Հին գաղտնաբառ</label>
            <div>
              <input type={oldPwdType} id='old-pwd' value={oldPwd} onChange={handleChange(setOldPwd)} required={true} />
              <button type='button' className='password-visible' tabIndex={-1} onTouchStart={() => setOldPwdType('text')} onTouchEnd={() => setOldPwdType('password')} onMouseDown={() => setOldPwdType('text')} onMouseUp={() => setOldPwdType('password')} disabled={isLoading}>
                <Icon icon={icon(oldPwdType)} />
              </button>
            </div>
          </div>
          <div className='input-container'>
            <label htmlFor="new-pwd">Նոր գաղտնաբառ</label>
            <div>
              <input type={newPwdType} id='new-pwd' value={newPwd} onChange={handleChange(setNewPwd)} required={true} />
              <button type='button' className='password-visible' tabIndex={-1} onTouchStart={() => setOldPwdType('text')} onTouchEnd={() => setOldPwdType('password')} onMouseDown={() => setNewPwdType('text')} onMouseUp={() => setNewPwdType('password')} disabled={isLoading}>
                <Icon icon={icon(newPwdType)} />
              </button>
            </div>
          </div>
          <div className='input-container'>
            <label htmlFor="new-pwd-rpt">Կրկնեք նոր գաղտնաբառը</label>
            <div>
              <input type={newPwdRptType} id='new-pwd-rpt' value={newRptPwd} onChange={handleChange(setNewRptPwd)} required={true} />
              <button type='button' className='password-visible' tabIndex={-1} onTouchStart={() => setOldPwdType('text')} onTouchEnd={() => setOldPwdType('password')} onMouseDown={() => setNewPwdRptType('text')} onMouseUp={() => setNewPwdRptType('password')} disabled={isLoading}>
                <Icon icon={icon(newPwdRptType)} />
              </button>
            </div>
          </div>
        </div>
        {error ? <p className='error-msg'>{error}</p> : null}
        <div className='bottom'>
          <button className='submit-btn' disabled={isLoading}>Հաստատել</button>
        </div>
      </form>
    </main>
  );
}