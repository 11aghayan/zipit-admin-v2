import './Filters.css';
import { useQuery } from '@tanstack/react-query';

import CloseBtn from '@/components/close-btn/CloseBtn';
import { getAllCategories } from '@/api/categories';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import ListLoader from '@/components/list-loader/ListLoader';
import { CategoryType } from '@/types/CategoryTypes';

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  categories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function Filters({ isOpen, handleClose, categories, setCategories }: Props) {
  const axios = useAxiosPrivate();

  const { isLoading, isError, error, data } = useQuery({ queryKey: ['filter-categories'], queryFn: getAllCategories(axios) });
  
  const handleClick = (id: string) => {
    return () => {
      setCategories(prev => {
        if (prev.includes(id)) {
          return prev.filter(c => c !== id);
        }
        return [...prev, id];
      });
    }
  };
  
  return (
    <div onClick={handleClose} className={`filters ${isOpen ? 'open' : ''}`}>
      <div onClick={e => e.stopPropagation()} className='content'>
        <CloseBtn handleClose={handleClose} icon='arrow-left' position='left' />
        {
          isLoading
          ?
          <ListLoader page='items' />
          :
          isError
          ?
          <p className='error-msg'>{error.message}</p>
          :
          <ul className='category-list'>
            {
              (data as CategoryType[]).map(({ id, itemsQty, label }) => (
                <li 
                  key={id}
                  onClick={handleClick(id)}
                  className={categories.includes(id) ? 'selected' : ''}
                >
                  <p>{label.am}</p>
                  <p>({itemsQty})</p>
                </li>
              ))
            }
          </ul>
        }
      </div>
    </div>
  );
}