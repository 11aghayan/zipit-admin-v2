import './CategoriesPage.css';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getAllCategories } from '@/api/categories';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import ListLoader from '@/components/list-loader/ListLoader';
import { CategoryType } from '@/types/CategoryTypes';
import ConfirmDeleteModal from '@/components/confirm-delete-modal/ConfirmDeleteModal';

import CategoryRow from './components/category-row/CategoryRow';
import TopRow from './components/top-row/TopRow';
import CategoryModal from './components/category-modal/CategoryModal';


export default function CategoriesPage() {
  const axios = useAxiosPrivate();
  const { isLoading, data, isError, error } = useQuery({ queryKey: ['all_categories'], queryFn: getAllCategories(axios) });
  
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [details, setDetails] = useState<CategoryType | null>(null);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState('');
  const [deleteModalQuestion, setDeleteModalQuestion] = useState('');
  const [deleteModalErrors, setDeleteModalErrors] = useState<string[]>([]);
  
  return (
    <main className='categories-page'>
      <ConfirmDeleteModal 
        isOpen={isDeleteModalOpen} 
        setIsOpen={setIsDeleteModalOpen} 
        id={categoryIdToDelete} 
        type='category' 
        question={deleteModalQuestion} 
        errors={deleteModalErrors} 
        setErrors={setDeleteModalErrors}
      />
      <CategoryModal 
        isOpen={isCategoryModalOpen} 
        setIsOpen={setIsCategoryModalOpen} 
        details={details} 
        setDetails={setDetails} 
      />
      <TopRow openModal={() => setIsCategoryModalOpen(true)} />
      {
        isLoading
        ?
        <ListLoader page='categories' />
        :
        isError
        ?
        <p className='error-msg'>{error.message}</p>
        :
        <ul className='categories-list list'>
          {
            data?.map(({ id, itemsQty, label }) => (
              <CategoryRow 
                key={id}
                id={id}
                itemsQty={itemsQty}
                label={label}
                setIsModalOpen={setIsCategoryModalOpen}
                setDetails={setDetails}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
                setCategoryIdToDelete={setCategoryIdToDelete}
                setDeleteModalQuestion={setDeleteModalQuestion}
                setDeleteModalErrors={setDeleteModalErrors}
              />
            ))
          }
        </ul>
      }
    </main>
  );
}