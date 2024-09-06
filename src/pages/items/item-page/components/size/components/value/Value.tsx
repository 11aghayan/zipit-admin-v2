import './Value.css';

import { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

import type { SizeValueType } from '@/types/ItemTypes';

import useLoading from '../../../useLoading/useLoading';

type ValuesType =  {
  value: SizeValueType;
  id: string;
}[];

type Props = {
  value: SizeValueType;
  id: string;
  colors: string[];
  values: ValuesType;
  setValues: React.Dispatch<React.SetStateAction<ValuesType>>;
};

export default function Value({ value, colors, values, setValues, id }: Props) {
  const isLoading = useLoading();
  
  const [strVal, setStrVal] = useState(value.value.toString());
  
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStrVal(e.target.value);
    setValues(prev => prev.map(val => val.id === id ? { ...val, value: { ...val.value, value: Number(e.target.value) } } : val))
  }; 
  
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      setValues(prev => prev.map(val => val.id === id ? { ...val, value: { ...val.value, colors: Array.from(new Set([ ...val.value.colors, e.target.value ])) } } : val));
    } else {
      setValues(prev => prev.map(val => val.id === id ? { ...val, value: { ...val.value, colors: val.value.colors.filter(c => c !== e.target.value) } } : val));
    }
  };
  
  const handleDelete = () => {
    setValues(prev => prev.filter(val => val.id !== id));
  };
  
  return (
    <div className='item-page--size--value'>
      <button type='button' disabled={isLoading} className={`delete-btn ${values.length < 2 ? 'hide' : ''}`} onClick={handleDelete}>
        <Icon icon='material-symbols-light:delete' />
      </button>
      <div className='input-container'>
        <input type="number" disabled={isLoading} value={strVal} required={true} onChange={handleValueChange} min={0} step={0.1} />
        <div className='color-container'>
          {
            colors.length > 0 
            ?
            colors.map((color, i) => (
              <label htmlFor={id + '-' + color + '-' + i} key={id + '-' + color + '-' + i}>
                <p>{color.split('&dash&')[0]}</p>
                <input 
                id={id + '-' + color + '-' + i}
                type='checkbox'
                defaultChecked={value.colors.includes(color)}
                value={color}
                onChange={handleColorChange}
                disabled={isLoading}
              />
              </label>
            ))
            :
            <p>Գույներ չկան</p>
          }
        </div>
      </div>
    </div>
  );
}