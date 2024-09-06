import './Promo.css';

import { useState } from 'react';

import useLoading from '../useLoading/useLoading';

type Props = {
  promo: number | null;
  setPromo: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function Promo({ promo, setPromo }: Props) {
  const isLoading = useLoading();
  
  const [promoStr, setPromoStr] = useState(promo?.toString());
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromoStr(e.target.value);

    if (e.target.value) {
      setPromo(Number(e.target.value));
    } else {
      setPromo(null);
    }
  };
  
  return (
    <section className='item-page--promo'>
      <label htmlFor="promo">Ակցիա</label>
      <div>
        <input type="number" disabled={isLoading} placeholder='Չկա' id='promo' value={promoStr} min={0} onChange={handleChange} />
        <p>դրամ</p>
      </div>
    </section>
  );
}