import './Name.css';

import { BiLingualObjectType } from '@/types/CommonTypes';

import useLoading from '../useLoading/useLoading';


type Props = {
  name: BiLingualObjectType;
  setName: React.Dispatch<React.SetStateAction<BiLingualObjectType>>;
}

export default function Name({ name, setName }: Props) {
  const isLoading = useLoading();
  
  const handleChange = (lang: 'am' | 'ru') => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(prev => ({
        ...prev,
        [lang]: e.target.value.trim()
      }));
    };
  };
  
  return (
    <section className='item-page--name'>
      <div>
        <label htmlFor="name-am">Ապրանքի անունը հայերեն</label>
        <input type="text" disabled={isLoading} id='name-am' required={true} value={name.am} onChange={handleChange('am')} />
      </div>
      <div>
        <label htmlFor="name-ru">Ապրանքի անունը ռուսերեն</label>
        <input type="text" disabled={isLoading} id='name-ru' required={true} value={name.ru} onChange={handleChange('ru')} />
      </div>
    </section>
  );
}