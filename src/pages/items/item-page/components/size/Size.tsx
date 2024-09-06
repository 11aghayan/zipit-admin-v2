import './Size.css';

import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

import { getSizeUnitAm } from '@/util/unitLangtMap';
import type { SizeType, SizeUnitType } from '@/types/ItemTypes';

import Value from './components/value/Value';
import useLoading from '../useLoading/useLoading';

type Props = {
  colors: string[];
  size: SizeType;
  setSize: React.Dispatch<React.SetStateAction<SizeType>>;
}

export default function Size({ colors, size, setSize }: Props) {
  const isLoading = useLoading();
  
  const [values, setValues] = useState(size.values.map(value => ({ value, id: (Math.random() * 100).toString() })));
  const units: SizeUnitType[] = ['cm', 'mm', 'm'];
  
  const handleAddNewSize = () => {
    setValues(prev => [...prev, { id: (Math.random() * 100).toString(), value: { value: 0, colors: [] } }]);
  };
  
  useEffect(() => {
    setSize(prev => ({
      ...prev,
      values: values.map(v => v.value)
    }));
  }, [values]);
  
  return (
    <section className='item-page--size'>
      Չափսեր
      <div className='size-value-container'>
        {
         values.map(({ value, id }) => (
            <Value 
              key={id}
              value={value}
              values={values}
              setValues={setValues}
              id={id}
              colors={colors}
            />
          ))
        }
      </div>
      <button type='button' disabled={isLoading} className='add-new-size-btn' onClick={handleAddNewSize}>
        <p>Ավելացնել նոր չափս</p>
        <Icon icon='fluent:add-16-filled' />
      </button>
      <div className='size-unit-container'>
        <label htmlFor="size-unit">Չափսի միավորը</label>
        <select id="size-unit" defaultValue={size.unit} disabled={isLoading}>
          {
            units.map((unit) => (
              <option 
                key={unit}
                value={unit}
              >
                {getSizeUnitAm(unit)}
              </option>
            ))
          }
        </select>
      </div>
    </section>
  );
}