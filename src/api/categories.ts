import { AxiosError, AxiosInstance } from "axios";

import { CategoryType } from "@/types/CategoryTypes";
import { BiLingualObjectType } from "@/types/CommonTypes";


export function getAllCategories(axios: AxiosInstance) {
  return async () => {
    try {
      const res = await axios.get('/categories/admin');
      
      return res.data as CategoryType[];
    } catch (error) {
      console.error(error);
      return null;
    }
  };
}

export async function addCategory(axios: AxiosInstance, body: BiLingualObjectType) {
  try {
    await axios.post('/categories', { label: body });
    
    return { ok: true };
  } catch (error) {
    console.error(error);
    const customError = error as AxiosError;
    const responseData = customError.response?.data as { message: string };
    return { ok: false, msg: responseData?.message || customError.message };
  }
}

export async function editCategory(axios: AxiosInstance, body: BiLingualObjectType, id: string) {
  try {
    await axios.put(`/categories/${id}`, { label: body });
    
    return { ok: true };
  } catch (error) {
    console.error(error);
    const customError = error as AxiosError;
    const responseData = customError.response?.data as { message: string };
    return { ok: false, msg: responseData?.message || customError.message };
  }
}

export async function deleteCategory(axios: AxiosInstance, id: string) {
  try {
    await axios.delete(`/categories/${id}`);
    
    return { ok: true };
  } catch (error) {
    console.error(error);
    const customError = error as AxiosError;
    const responseData = customError.response?.data as { message: string };
    return { ok: false, msg: responseData?.message || customError.message };
  }
}