import './Photos.css';

import { useState } from 'react';

import { PhotoType } from '@/types/ItemTypes';

import SelectedPhoto from './components/selectedPhoto/SelectedPhoto';
import PhotoList from './components/photoList/PhotoList';

type Props = {
  photos: PhotoType[];
  setPhotos: React.Dispatch<React.SetStateAction<PhotoType[]>>;
}

export default function Photos({ photos, setPhotos }: Props) {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoType | null>(photos[0] || null);
  const [sectionHeight, setSectionHeight] = useState<number>();
  
  return (
    <section className='item-page--photos'>
      <SelectedPhoto photos={photos} setSectionHeight={setSectionHeight} setPhotos={setPhotos} selectedPhoto={selectedPhoto} setSelectedPhoto={setSelectedPhoto} />
      <PhotoList sectionHeight={sectionHeight} photos={photos} setPhotos={setPhotos} selectedPhoto={selectedPhoto} setSelectedPhoto={setSelectedPhoto} />
    </section>
  );
}