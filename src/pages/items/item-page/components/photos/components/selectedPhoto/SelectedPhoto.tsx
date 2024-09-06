import './SelectedPhoto.css';

import { useEffect, useRef, useState } from 'react';

import useScreen from '@/hooks/useScreen';
import type { PhotoType } from '@/types/ItemTypes';

import AddPhotoBtn from '../addPhotoBtn/AddPhotoBtn';
import useLoading from '../../../useLoading/useLoading';

type Props = {
  photos: PhotoType[];
  setPhotos: React.Dispatch<React.SetStateAction<PhotoType[]>>;
  setSelectedPhoto: React.Dispatch<React.SetStateAction<PhotoType | null>>;
  selectedPhoto: PhotoType | null;
  setSectionHeight: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export default function SelectedPhoto({ setSectionHeight, photos, setPhotos, selectedPhoto, setSelectedPhoto }: Props) {
  const { screen, width, height } = useScreen();

  const isLoading = useLoading();

  const [size, setSize] = useState(screen === 'lg' ? 300 : screen === 'md' ? 250 : 200);

  const [nameAm, setNameAm] = useState(selectedPhoto?.color.am || '');
  const [nameRu, setNameRu] = useState(selectedPhoto?.color.ru || '');

  const ref = useRef(null);
  
  const handleNameChange = (lang: 'am' | 'ru') => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const setName = lang === 'am' ? setNameAm : setNameRu;
      setName(e.target.value);
      setPhotos(prev => {
        return prev.map(photo => photo.src === selectedPhoto?.src ? { ...photo, color: { am: nameAm, ru: nameRu } } : photo);
      });
    };
  };

  useEffect(() => {
    const wasDeleted = !(photos.find(({ src }) => src.startsWith(selectedPhoto?.src.slice(0, 200) || 'none')));
    if (wasDeleted) setSelectedPhoto(photos[0]);
  }, [photos]);
  
  useEffect(() => {
    setNameAm(selectedPhoto?.color.am || '');
    setNameRu(selectedPhoto?.color.ru || '');
  }, [selectedPhoto]);

  useEffect(() => {
    if (!ref.current) return;

    setSectionHeight((ref.current as HTMLElement).clientHeight);
  }, [ref.current, width, height]);

  useEffect(() => {
    setSize(screen === 'lg' ? 300 : screen === 'md' ? 250 : 200);
  }, [screen]);
  
  return (
    <div ref={ref} className='item-page--selected-photo' style={{ width: size }}>
      {
        selectedPhoto
        ?
        <>
          <div style={{ width: size, height: size }} className='photo-container'>
            <img src={selectedPhoto.src} alt='item photo' width={size} height={size} />
          </div>
          <section className='name-inputs'>
            <div>
              <label htmlFor="color-name-am">Գույնի անվանումը հայերեն</label>
              <input type="text" disabled={isLoading} id='color-name-am' onChange={handleNameChange('am')} value={nameAm} />
            </div>
            <div>
              <label htmlFor="color-name-ru">Գույնի անվանումը ռուսերեն</label>
              <input type="text" disabled={isLoading} id='color-name-ru' onChange={handleNameChange('ru')} value={nameRu} />
            </div>
          </section>
        </>
        :
        <AddPhotoBtn photos={photos} setSelectedPhoto={setSelectedPhoto} size={size} setPhotos={setPhotos} />
      }
    </div>
  );
}