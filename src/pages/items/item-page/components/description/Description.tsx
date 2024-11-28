import './Description.css';

import { BiLingualObjectType } from '@/types/CommonTypes';

import useLoading from '../useLoading/useLoading';

type Props = {
  description: BiLingualObjectType;
  setDescription: React.Dispatch<React.SetStateAction<BiLingualObjectType>>;
}

export default function Description({ description, setDescription }: Props) {
  const isLoading = useLoading();

  const handleChange = (lang: 'am' | 'ru') => {
    return (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setDescription(prev => ({
        ...prev,
        [lang]: e.target.value
      }));
    };
  };
  
  return (
    <section className='item-page--description'>
      <div>
        <label htmlFor="description-am">Նկարագրությունը հայերեն</label>
        <textarea id="description-am" disabled={isLoading} value={description.am} onChange={handleChange('am')} />
      </div>
      <div>
        <label htmlFor="description-ru">Նկարագրությունը ռուսերեն</label>
        <textarea id="description-ru" disabled={isLoading} value={description.ru} onChange={handleChange('ru')} />
      </div>
    </section>
  );
}