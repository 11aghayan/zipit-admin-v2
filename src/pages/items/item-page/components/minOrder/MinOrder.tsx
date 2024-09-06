import './MinOrder.css';

import { useState } from 'react';

import { MinOrderType, MinOrderUnitType } from '@/types/ItemTypes';
import { getMinOrderUnitAm } from '@/util/unitLangtMap';

import useLoading from '../useLoading/useLoading';

type Props = {
  minOrder: MinOrderType;
  setMinOrder: React.Dispatch<React.SetStateAction<MinOrderType>>;
}

export default function MinOrder({ minOrder, setMinOrder }: Props) {
  const isLoading = useLoading();
  
  const [qty, setQty] = useState(minOrder.qty.toString());
  
  const units: MinOrderUnitType[] = ['pcs', 'cm', 'box', 'roll'];
  
  const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {  
    setQty(e.target.value);
    
    setMinOrder(prev => ({
      ...prev,
      qty: Number(e.target.value)
    }));
  };

  
  return (
    <section className='item-page--min-order'>
      <div>
        <label htmlFor="min-order-qty">Նվազագույն պատվեր</label>
        <input type="number" disabled={isLoading} id='min-order-qty' required={true} value={qty} onChange={handleQtyChange} />
      </div>
      <div>
        <select id="min-order-unit" disabled={isLoading} defaultValue={minOrder.unit}>
          {
            units.map((unit) => (
              <option 
                key={unit}
                value={unit}
              >
                {getMinOrderUnitAm(unit)}
              </option>
            ))
          }
        </select>
      </div>
    </section>
  );
}