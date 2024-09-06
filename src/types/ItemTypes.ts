import { BiLingualObjectType } from "./CommonTypes";

export type AllItemsResponseType = { 
  page: number; 
  items: { id: string, name: BiLingualObjectType, minOrder: MinOrderType}[];
  length: number, 
  pages: number
}

export type ItemType = {
  id: string;
  category: ItemCategoryType;
  name: BiLingualObjectType;
  price: number;
  promo: number | null;
  size: SizeType;
  minOrder: MinOrderType;
  photos: PhotoType[];
  description: BiLingualObjectType;
};

export type ItemCategoryType = {
  id: string;
  name: BiLingualObjectType;
}

export type SizeType = {
  values: SizeValueType[];
  unit: SizeUnitType;
}

export type SizeUnitType = 'mm' | 'cm' | 'm';

export type SizeValueType = {
  value: number;
  colors: string[];
}

export type MinOrderUnitType = 'pcs' | 'cm' | 'box' | 'roll';

export type MinOrderType = {
  qty: number;
  unit: MinOrderUnitType
}

export type PhotoType = {
  src: string;
  color: BiLingualObjectType;
};