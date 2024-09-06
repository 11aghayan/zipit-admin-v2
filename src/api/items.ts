import { AxiosError, AxiosInstance } from "axios";

import { AllItemsResponseType, ItemType } from "@/types/ItemTypes";
import { ServerErrorType } from "@/types/ErrorTypes";

export async function getAllItems(axios: AxiosInstance, sp: URLSearchParams) {
  try {
    const res = await axios.get(`/items/admin?${sp}`);
    
    if (res.status !== 200) throw new Error(res.data.message);
    
    return res.data as AllItemsResponseType;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getItem(axios: AxiosInstance, id: string) {
  if (id === 'new') return null;
  
  try {
    const res = await axios.get(`/items/item/${id}`);

    if (res.status !== 200) throw new Error(res.data.message);
    
    return res.data as ItemType;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function add_or_editItem(method: 'post' | 'put', axios: AxiosInstance, body: Omit<ItemType, "id">, id?: string) {
  const baseUrl = '/items';
  const url = method === 'post' ? baseUrl : `${baseUrl}/item/${id}`;
  
  try {
    const res = await axios[method](url, body);

    if (res.status !== 200 && res.status !== 201) throw new Error(res.data.message);
    
    return { ok: true };
  } catch (error) {
    console.error(error as ServerErrorType);
    const customError = error as AxiosError;
    const data = customError.response?.data as ServerErrorType;
    return { ok: false, msg: data?.message || 'Unknown Error' };
  }
}

export async function deleteItem(axios: AxiosInstance, id: string) {
  try {
    const res = await axios.delete(`/items/item/${id}`);

    if (res.status !== 200) throw new Error(res.data.message);
    
    return { ok: true };
  } catch (error) {
    console.error(error as ServerErrorType);
    const customError = error as AxiosError;
    const data = customError.response?.data as ServerErrorType;
    return { ok: false, msg: data?.message || 'Unknown Error' };
  }
}