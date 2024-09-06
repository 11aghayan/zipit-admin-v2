import './AllItemsPage.css';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Icon } from '@iconify/react/dist/iconify.js';

import { getAllItems } from '@/api/items';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import ListLoader from '@/components/list-loader/ListLoader';
import { AllItemsResponseType } from '@/types/ItemTypes';
import ConfirmDeleteModal from '@/components/confirm-delete-modal/ConfirmDeleteModal';
import { getMinOrderUnitAm } from '@/util/unitLangtMap';

import TopRow from './components/top-row/TopRow';
import Filters from './components/filters/Filters';
import Pagination from './components/pagination/Pagination';


export default function AllItemsPage() {
  const axios = useAxiosPrivate();
  const [sp, setSp] = useSearchParams();
  const [page, setPage] = useState(parseInt(sp.get('page') || '1'));
  const [categories, setCategories] = useState(sp.get('categories')?.split(',') || []);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState('');
  const [deleteModalQuestion, setDeleteModalQuestion] = useState('');
  const [deleteModalErrors, setDeleteModalErrors] = useState<string[]>([]);

  const { isLoading, isError, error, data, refetch, isFetching } = useQuery({ queryKey: ['all-items', sp.toString()], queryFn: () => getAllItems(axios, sp) });
  
  useEffect(() => {
    setSp(`page=${page}${categories.length > 0 ? '&categories=' + categories.join(',') : ''}`);
    refetch();
  }, [page, categories.toString()]);
  

  const handleDelete = (id: string, itemName: string) => {
    const question = `Վստա՞հ եք, որ ցանկանում եք ջնջել «${itemName}» ապրանքը`;
    setItemIdToDelete(id);
    setDeleteModalQuestion(question);
    setIsDeleteModalOpen(true);
  };
  
  return (
    <main className='all-items-page'>
      <ConfirmDeleteModal 
        type='item' 
        id={itemIdToDelete} 
        question={deleteModalQuestion}  
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        errors={deleteModalErrors}
        setErrors={setDeleteModalErrors}
      />
      <div className='top'>
        <Filters isOpen={isFiltersOpen} handleClose={() => setIsFiltersOpen(false)} categories={categories} setCategories={setCategories} />
        <TopRow setIsFiltersOpen={setIsFiltersOpen} />
        {
          isLoading || isFetching
          ?
          <ListLoader page='items' />
          :
          isError
          ?
          <p className='error-msg'>{error.message}</p>
          :
          <ul className='items-list list'>
            {
              (data as AllItemsResponseType)
              .items?.map(item => (
                <li 
                  key={item.id}
                  className='row'
                >
                  <a href={`/items/${item.id}`}>
                    <span>{item.name.am}</span> 
                    <span> | </span>
                    <span className='unit'>{getMinOrderUnitAm(item.minOrder.unit)}</span>
                  </a>
                  <button className='delete-btn' onClick={() => handleDelete(item.id, item.name.am)}>
                    <Icon icon='weui:delete-filled' />
                  </button>
                </li>
              ))
            }
          </ul>
        }
      </div>
      <Pagination page={page} setPage={setPage} pageQty={data?.pages || 5} disabled={isLoading || isFetching || data?.pages === 1} />
    </main>
  );
}