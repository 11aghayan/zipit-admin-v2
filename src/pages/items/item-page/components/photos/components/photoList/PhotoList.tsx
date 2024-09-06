import './PhotoList.css';

import { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

import { PhotoType } from '@/types/ItemTypes';
import useScreen from '@/hooks/useScreen';

import AddPhotoBtn from '../addPhotoBtn/AddPhotoBtn';
import useLoading from '../../../useLoading/useLoading';

type Props = {
  photos: PhotoType[];
  setPhotos: React.Dispatch<React.SetStateAction<PhotoType[]>>;
  selectedPhoto: PhotoType | null;
  setSelectedPhoto: React.Dispatch<React.SetStateAction<PhotoType | null>>;
  sectionHeight: number | undefined;
}

export default function PhotoList({ sectionHeight, photos, setPhotos, selectedPhoto, setSelectedPhoto }: Props) {
  const { width: screenWidth } = useScreen();
  const isLoading = useLoading();
  
  const [size, setSize] = useState(70);
  
  const ref = useRef(null);
  
  const handlePick = (photo: PhotoType) => {
    return () => {
      if (!isLoading) {
        setSelectedPhoto(photo);
      }
    };
  }

  const handleDelete = (srcToDelete: string) => {
    return () => {
      if (!isLoading) {
        setPhotos(prev => prev.filter(({ src }) => !src.startsWith(srcToDelete)));
      }
    };
  };

  useEffect(() => {
    if (!ref.current) return;
    setSize((ref.current as HTMLDivElement).clientWidth);
  }, [ref.current, screenWidth, photos]);
  
  return (
    <div className='photo-list' style={{ maxHeight: sectionHeight }}>
      {
        photos.map(({ src, color }, i) => (
          <div 
            key={color.am + i + color.ru}
            className={`photo-wrapper ${isLoading ? 'loading' : ''} ${selectedPhoto?.src.startsWith(src.slice(0, 200)) ? 'selected' : ''}`}
            onClick={handlePick({src, color})}
            ref={ref}
          > 
            <button 
              className='delete-btn' 
              style={{ height: size, width: size }}
              onClick={handleDelete(src.slice(0, 200))}
              disabled={isLoading}
              type='button'
            >
              <Icon icon='icon-park-outline:delete-one' />
            </button>
            <img src={src} alt='Item photo' width={size} height={size} />
          </div>
        ))
      }
      <AddPhotoBtn photos={photos} size={size} setPhotos={setPhotos} setSelectedPhoto={setSelectedPhoto} />
    </div>
  );
}