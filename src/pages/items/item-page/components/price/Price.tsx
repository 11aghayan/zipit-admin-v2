import './Price.css';

import { useState } from 'react';

import useLoading from '../useLoading/useLoading';

type Props = {
  price: number;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
}

export default function Price({ price, setPrice }: Props) {
  const isLoading = useLoading();
  
  const [priceStr, setPriceStr] = useState(price.toString());
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceStr(e.target.value);
    setPrice(Number(e.target.value));
  };
  
  return (
    <section className='item-page--price'>
      <label htmlFor="price">Գին</label>
      <div>
        <input type="number" disabled={isLoading} id='price' required={true} value={priceStr} min={0} onChange={handleChange} />
        <p>դրամ</p>
      </div>
    </section>
  );
}