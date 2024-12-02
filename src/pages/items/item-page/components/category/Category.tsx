import './Category.css';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { ItemCategoryType } from '@/types/ItemTypes';
import { getAllCategories } from '@/api/categories';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';

import useLoading from '../useLoading/useLoading';

type Props = {
  category: ItemCategoryType;
  setCategory: React.Dispatch<React.SetStateAction<ItemCategoryType>>;
}

export default function Category({ category, setCategory }: Props) {
  const formLoading = useLoading();
  
  const axios = useAxiosPrivate();
  const { isLoading, isError, error, data: allCategories } = useQuery({queryKey: ['item-page-categories'], queryFn: getAllCategories(axios)});
  
  useEffect(() => {
    if (allCategories) {
      setCategory({ id: allCategories[0].id, name: allCategories[0].label });
    }
  }, [isLoading])
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(JSON.parse(e.target.value));
  };
  
  return (
    <section className='item-page--category'>
      {
        isLoading
        ?
        <p className='loader'>Կատեգորիաները բեռնվում են...</p>
        :
        isError
        ?
        <p className='error-msg'>{error.message}</p>
        :
        <div>
          <label htmlFor="item-page-categories">Կատեգորիա</label>
          <select disabled={formLoading} name="item-page-categories" id="item-page-categories" onChange={handleChange} defaultValue={JSON.stringify(category)}>
            {
              allCategories?.map(({ id, label }) => (
                <option key={id} value={JSON.stringify({id, name: label})}>
                  {label.am}
                </option>
              ))
            }
          </select>
        </div>

      }
    </section>
  );
}