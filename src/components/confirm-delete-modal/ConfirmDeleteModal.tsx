import './ConfirmDeleteModal.css';

import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { deleteCategory } from '@/api/categories';
import { deleteItem } from '@/api/items';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useState } from 'react';

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  type: 'category' | 'item';
  question: string;
  errors?: string[];
  setErrors: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function ConfirmDeleteModal({ isOpen, setIsOpen, id, type, question, errors = [], setErrors }: Props) {
  const deleteMethod = type === 'category' ? deleteCategory : deleteItem;
  const [isLoading, setIsLoading] = useState(false);
  const axios = useAxiosPrivate();
  const navigate = useNavigate();
  
  const handleClose = () => {
    if (isLoading) return;
    setIsOpen(false);
    setErrors([]);
  };

  const handleConfirm = async () => {
    if (errors.length > 1) return;
    setIsLoading(true);
    const res = await deleteMethod(axios, id);
    if (!res.ok) {
      errors.push(res.msg!);
    } else {
      toast.success(`${type === 'category' ? 'Կատեգորիան' : 'Ապրանքը'} ջնջվել է`);
      setTimeout(() => {
        navigate(0);
      }, 500);
    }
    setIsLoading(false);
  }
  
  return (
    <div onMouseDown={handleClose} className={`confirm-delete-modal modal ${isOpen ? 'open' : ''}`}>
      <div className='content' onMouseDown={e => e.stopPropagation()}>
        <h4>{question}</h4>
        {errors.length
        ?
          <div className='errors'>
            {
              errors.map((error, i) => (
                <p key={i} className='error-msg'>
                  {error}
                </p>
              ))
            }
        </div>
        :
        null
        }
        <div className='buttons'>
          <button disabled={isLoading} onClick={handleClose}>Չեղարկել</button>
          <button disabled={isLoading} className='confirm' onClick={handleConfirm}>Հաստատել</button>
        </div>
      </div>
    </div>
  );
}