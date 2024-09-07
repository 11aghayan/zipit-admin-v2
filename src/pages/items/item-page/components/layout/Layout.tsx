import './Layout.css';

import { createContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import type { ItemCategoryType, ItemType, MinOrderType, PhotoType, SizeType } from '@/types/ItemTypes';
import type { BiLingualObjectType } from '@/types/CommonTypes';
import { add_or_editItem } from '@/api/items';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';

import Category from '../category/Category';
import Name from '../name/Name';
import Price from '../price/Price';
import Size from '../size/Size';
import MinOrder from '../minOrder/MinOrder';
import Photos from '../photos/Photos';
import Description from '../description/Description';
import Promo from '../promo/Promo';

type Props = {
  data: ItemType | null;
}

export const LoadingContext = createContext(false);

export default function Layout({ data }: Props) {
  const { itemId: id } = useParams();
  const axios = useAxiosPrivate();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [category, setCategory] = useState<ItemCategoryType>(data?.category || { id: '', name: { am: '', ru: '' } });
  const [name, setName] = useState<BiLingualObjectType>(data?.name || { am: '', ru: '' });
  const [price, setPrice] = useState<number>(data?.price || 0);
  const [promo, setPromo] = useState<number | null>(data?.promo || null);
  const [size, setSize] = useState<SizeType>(data?.size || { unit: 'cm', values: [{ value: 0, colors: [] }]});
  const [minOrder, setMinOrder] = useState<MinOrderType>(data?.minOrder || { qty: 0, unit: 'pcs' });
  const [photos, setPhotos] = useState<PhotoType[]>(data?.photos || []);
  const [description, setDescription] = useState<BiLingualObjectType>(data?.description || { am: '', ru: '' });
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    setError('');

    const body = {
      category,
      name,
      price,
      promo,
      size,
      minOrder,
      photos,
      description
    };
    
    const res = await add_or_editItem(data === null ? 'post' : 'put', axios, body, id);

    if (!res.ok) {
      setError(res.msg!);
      setIsLoading(false);
    } else {
      navigate('/items');
    }
  };
  
  return (
    <LoadingContext.Provider value={isLoading}>
      <form className={`item-page--layout ${isLoading ? 'loading' : ''}`} onSubmit={handleSubmit}>
        <Photos photos={photos} setPhotos={setPhotos} />
        <Category category={category} setCategory={setCategory} />
        <Name name={name} setName={setName} />
        <Size colors={photos.map(({ color: { am: colorAm, ru: colorRu } }) => colorAm && colorRu ? `${colorAm}&dash&${colorRu}` : null).filter(color => color !== null)} size={size} setSize={setSize} />
        <MinOrder minOrder={minOrder} setMinOrder={setMinOrder} />
        <Price price={price} setPrice={setPrice} />
        <Promo promo={promo} setPromo={setPromo} />
        <Description description={description} setDescription={setDescription} />
        {error ? <p className='error-msg' >{error}</p> : null}
        <div className='btn-container'>
          <button className='save-btn' disabled={isLoading}>Պահպանել</button>
        </div>
      </form>
    </LoadingContext.Provider>
  );
}