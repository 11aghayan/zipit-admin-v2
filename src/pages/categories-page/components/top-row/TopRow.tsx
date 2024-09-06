import './TopRow.css';

import { Icon } from '@iconify/react/dist/iconify.js';

type Props = {
  openModal: () => void;
}

export default function TopRow({ openModal }: Props) {
  
  return (
    <section className='top-row'>
      <p className='header'>Կատեգորիաներ</p>
      <button className='add-category-btn' onClick={openModal}>
        <Icon icon='mdi:invoice-add' />
      </button>
    </section>
  );
}