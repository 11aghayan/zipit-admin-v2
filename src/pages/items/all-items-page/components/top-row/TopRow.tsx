import './TopRow.css';

import { Icon } from '@iconify/react/dist/iconify.js';


type Props = {
  setIsFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TopRow({ setIsFiltersOpen }: Props) {

  return (
    <section className='items-top-row'>
      <h4>Ապրանքներ</h4>
      <div className='buttons'>
        <button onClick={() => {setIsFiltersOpen(true)}}>
          <Icon icon='mage:filter-square' />
        </button>
        <a href="/items/new">
          <Icon icon='basil:add-outline' />
        </a>
      </div>
    </section>
  );
}