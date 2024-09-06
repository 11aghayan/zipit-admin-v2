import { MinOrderUnitType, SizeUnitType } from "@/types/ItemTypes";

export function getMinOrderUnitAm(unit: MinOrderUnitType) {
  const map = {
    'pcs': 'հատ',
    'cm': 'սմ',
    'box': 'տուփ',
    'roll': 'գլան'
  };

  return map[unit];
}

export function getSizeUnitAm(unit: SizeUnitType) {
  const map = {
    'cm': 'սմ',
    'mm': 'մմ',
    'm': 'մ'
  };

  return map[unit];
}