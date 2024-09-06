import toast from 'react-hot-toast';
import './Row.css';

type Props = {
  isProtected: boolean;
  method: string;
  label: string;
  route: string;
}

export default function Row({ isProtected, method, label, route }: Props) {

  const handleClick = () => {
    navigator.clipboard.writeText(route);
    toast('Text copied to the clipboard', {
      icon: '📋'
    });
  };
  
  return (
    <div  
      className={`endpoint-row ${isProtected ? 'protected' : ''} ${method}`}
      onClick={handleClick}
    >
      <p className='method'>{method}</p>
      <div>
        <p>{label}</p>
        <p>{route}</p>
      </div>
    </div>
  );
}