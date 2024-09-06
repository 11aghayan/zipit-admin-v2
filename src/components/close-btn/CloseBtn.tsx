import './CloseBtn.css';

import { Icon } from '@iconify/react/dist/iconify.js';

type Props = {
  handleClose: () => void;
  icon: 'cross' | 'arrow-right' | 'arrow-left';
  hide?: boolean;
  position?: 'left' | 'right';
}

export default function CloseBtn({ handleClose, hide = false, icon, position = 'right' }: Props) {

  const icons = {
    'cross': 'lets-icons:close-round',
    'arrow-right': 'iconamoon:arrow-right-2-light',
    'arrow-left': 'iconamoon:arrow-left-2-light'
  };
  
  return (
    <button className={`close-btn ${hide ? 'hide' : ''} ${position === 'right' ? 'align-right' : ''}`} onClick={handleClose}>
      <Icon icon={icons[icon]} />
    </button>
  );
}