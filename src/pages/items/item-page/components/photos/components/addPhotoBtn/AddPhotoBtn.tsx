import './AddPhotoBtn.css';

import { Icon } from '@iconify/react/dist/iconify.js';

import { PhotoType } from '@/types/ItemTypes';

import useLoading from '../../../useLoading/useLoading';

type Props = {
  size: number;
  photos: PhotoType[];
  setPhotos: React.Dispatch<React.SetStateAction<PhotoType[]>>;
  setSelectedPhoto: React.Dispatch<React.SetStateAction<PhotoType | null>>;
}

export default function AddPhotoBtn({ size, photos, setPhotos, setSelectedPhoto }: Props) {
  const isLoading = useLoading();
  
  const handleImgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    if (isLoading) return;
    
    const file = e.target.files ? e.target.files[0] : null;

    if (!file) return;
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const photo = {
        src: reader.result as string,
        color: {
          am: '',
          ru: ''
        }
      };
      
      const isRepeat = photos.find(({ src }) => src === photo.src);

      if (!isRepeat) {
        setSelectedPhoto(photo);
        
        setPhotos(prev => ([
          ...prev,
          photo
        ]))
      }
      
    };

    e.target.value = '';
  };
  
  return (
    <button 
      type='button' 
      className='add-photo-btn' 
      disabled={isLoading} 
      style={{ width: size, height: size }}
    >
      <label htmlFor="upload-photo-input" className='upload-photo-input' />
      <input id='upload-photo-input' onChange={handleImgUpload} type="file" accept='image/*' disabled={isLoading} />
      <Icon icon='majesticons:image-plus' className='icon' />
    </button>
  );
}