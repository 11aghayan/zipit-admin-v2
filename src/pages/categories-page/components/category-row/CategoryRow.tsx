import './CategoryRow.css';

import { Icon } from '@iconify/react/dist/iconify.js';

import { CategoryType } from '@/types/CategoryTypes';

type Props = CategoryType & {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDetails: React.Dispatch<React.SetStateAction<CategoryType | null>>;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCategoryIdToDelete: React.Dispatch<React.SetStateAction<string>>;
  setDeleteModalQuestion: React.Dispatch<React.SetStateAction<string>>;
  setDeleteModalErrors: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function CategoryRow({ id, itemsQty, label, setIsModalOpen, setDetails, setIsDeleteModalOpen, setCategoryIdToDelete, setDeleteModalQuestion, setDeleteModalErrors }: Props) {

  const handleEdit = () => {
    setDetails({ id, itemsQty, label });
    setIsModalOpen(true);
  };
  
  const handleDelete = () => {
    if (itemsQty > 0) {
      setDeleteModalErrors(['Կատեգորիան ջնջելու համար այն պետք է չպարունակի որևէ ապրանք', `Ապրանքների քանակը: ${itemsQty}`]);
    }
    setCategoryIdToDelete(id);
    setDeleteModalQuestion(`Վստա՞հ եք, որ ցանկանում եք ջնջել «${label.am}» կատեգորիան`);
    setIsDeleteModalOpen(true);
  };
  
  return (
    <li className='row category-row'>
      <div>
        <p>{label.am}</p>
        <p>({itemsQty})</p>
      </div>
      <div>
        <button onClick={handleEdit}>
          <Icon icon='mage:edit-fill' />
        </button>
        <button className='delete-btn' onClick={handleDelete}>
          <Icon icon='weui:delete-filled' />
        </button>
      </div>
    </li>
  );
}