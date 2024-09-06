import './ListLoader.css';

import { useEffect, useState } from 'react';

import useScreen from '@/hooks/useScreen';

type Props = {
  page: 'categories' | 'items';
};

export default function ListLoader({ page }: Props) {
  const { height: screenHeight, width: screenWidth } = useScreen();
  const [rowQty, setRowQty] = useState(0);

  const rowArray = new Array(rowQty).fill(1);
  
  useEffect(() => {
    let rows = Math.floor(screenHeight / (61 + 3));
    if (page === 'categories') {
      rows = screenWidth > 999 ? rows * 2 : rows;
    }

    if (page === 'items') {
      rows = screenWidth > 999 ? rows * 4 : screenWidth > 599 ? rows * 2 : rows;
    }
      setRowQty(rows);
  }, [screenHeight]);
  

  
  return (
    <ul className={`list-loader ${page === 'categories' ? 'categories' : 'items'}`}>
      {
        rowArray.map((_val, i) => (
          <li key={i} />
        ))
      }
    </ul>
  );
}