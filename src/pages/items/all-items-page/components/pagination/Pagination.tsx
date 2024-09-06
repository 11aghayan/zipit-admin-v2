import './Pagination.css';

import { Icon } from '@iconify/react/dist/iconify.js';

type Props = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pageQty: number;
  disabled: boolean;
}

export default function Pagination({ page, setPage, pageQty, disabled }: Props) {

  const currentButtons: number[] = [];
  
  for (let i = page - 2; i <= (page + 2 < pageQty ? page + 2 : pageQty); i++) {
    if (i < 2 || i === pageQty) continue;
    currentButtons.push(i);
  }

  const handlePrev = () => {
    if (page < 2) return;
    setPage(prev => prev - 1);
  };

  const handleNext = () => {
    if (page >= pageQty) return;
    setPage(prev => prev + 1);
  };

  const handleExact = (val: number) => {
    return () => {
      if (page === val) return;
      setPage(val);
    }
  };
  
  return (
    <div className='pagination'>
      <button onClick={handlePrev} disabled={disabled || page < 2} className='icon'>
        <Icon icon='carbon:previous-outline' />
      </button>
      <button onClick={handleExact(1)} disabled={disabled || page < 2} className={page === 1 ? 'active' : ''}>
        1
      </button>
      {currentButtons[0] > 2 ? <span>...</span> : null}
      {
        currentButtons.map(val => (
          <button 
            key={val}
            onClick={handleExact(val)}
            disabled={disabled || page === val}
            className={page === val ? 'active' : ''}
          >
            {val}
          </button>
        ))
      }
      {currentButtons.at(-1)! < pageQty - 1 ? <span>...</span> : null}
      {
        pageQty > 1
        ?
        <button onClick={handleExact(pageQty)} disabled={disabled || page === pageQty} className={page === pageQty ? 'active' : ''}>
          {pageQty}
        </button>
        :
        null
      }
      <button onClick={handleNext} disabled={disabled || page >= pageQty} className='icon'>
        <Icon icon='carbon:next-outline' />
      </button>
    </div>
  );
}