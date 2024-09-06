import './ItemPage.css';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { getItem } from '@/api/items';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import Loader from '@/components/loader/Loader';

import Layout from './components/layout/Layout';


export default function ItemPage() {
  const { itemId: id } = useParams();
  const axios = useAxiosPrivate();
  const { isLoading, isError, error, data } = useQuery({ queryKey: ['item', id], queryFn: () => getItem(axios, id || 'new') });
  
  return (
    <main className='item-page'>
      {
        isLoading
        ?
        <Loader show={true} position='absolute' />
        :
        isError || data === undefined
        ?
        <p>{error?.message || 'Data is undefined'}</p>
        :
        <Layout data={data} />
      }
    </main>
  );
}