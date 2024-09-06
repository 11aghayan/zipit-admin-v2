import './Loader.css';


type Props = {
  show: boolean;
  position: 'fixed' | 'absolute';
}

export default function Loader({ show, position }: Props) {

  return (
    <div className={`loader ${show ? 'show' : ''} ${position}`}>
      <div className='loading-element' />
    </div>
  );
}