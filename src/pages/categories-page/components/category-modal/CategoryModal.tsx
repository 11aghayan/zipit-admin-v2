import './CategoryModal.css';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { CategoryType } from '@/types/CategoryTypes';
import { addCategory, editCategory } from '@/api/categories';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';


type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDetails: React.Dispatch<React.SetStateAction<CategoryType | null>>;
  details: CategoryType | null;
}

export default function CategoryModal({ isOpen, setIsOpen, details, setDetails }: Props) {
  const [nameAm, setNameAm] = useState(details?.label.am || '');
  const [nameRu, setNameRu] = useState(details?.label.ru || '');
  const [isLoading, setIsLoading] = useState(false);
  const axios = useAxiosPrivate();
  const navigate = useNavigate();
  
  const handleChange = (lang: 'am' | 'ru') => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const setValue = lang === 'am' ? setNameAm : setNameRu;
      setValue(e.target.value);
    };
  };

  const handleClose = () => {
    if(isLoading) return;
    setIsOpen(false);
    setDetails(null);
    setNameAm('');
    setNameRu('');
  };

  const handleSave = async () => {
    if (details?.label.am === nameAm && details?.label.ru === nameRu) {
      handleClose();
      return;
    }
    setIsLoading(true);
    
    const saveMethod = details ? editCategory : addCategory;

    const res = await saveMethod(axios, { am: nameAm, ru: nameRu }, details?.id || '');
      
    if (!res.ok) {
      toast.error(res?.msg!);
    } else {
      toast.success(details ? 'Կատեգորիան խմբագրվել է' : 'Կատեգորիան ստեղծվել է');
      setTimeout(() => {
        navigate(0);
      }, 500)
    }

    setIsLoading(false);
  };

  const header = details ? 'Խմբագրել կատեգորիան' : 'Ստեղծել նոր կատեգորիա';

  useEffect(() => {
    setNameAm(details?.label.am || '');
    setNameRu(details?.label.ru || '');
  }, [details?.id]);
  
  return (
    <div onMouseDown={handleClose} className={`category-modal modal ${isOpen ? 'open' : ''}`}>
      <div className='content' onMouseDown={e => e.stopPropagation()}>
        <div className='inputs'>
          <h4 className='header'>{header}</h4>
          <div className='input-wrapper'>
            <label htmlFor="name-am">Հայերեն անուն</label>
            <input type="text" id='name-am' name='name-am' required={true} disabled={isLoading} value={nameAm} onChange={handleChange('am')}  />
          </div>
          <div className='input-wrapper'>
            <label htmlFor="name-ru">Ռուսերեն անուն</label>
            <input type="text" id='name-ru' name='name-ru' required={true} disabled={isLoading} value={nameRu} onChange={handleChange('ru')}  />
          </div>
        </div>
        <div className='buttons'>
          <button className='cancel-btn' disabled={isLoading} onClick={handleClose}>Չեղարկել</button>
          <button className='save-btn' disabled={isLoading} onClick={handleSave}>Պահպանել</button>
        </div>
      </div>
    </div>
  );
}