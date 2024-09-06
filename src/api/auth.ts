import { AxiosError, AxiosInstance } from "axios";

import { axiosPrivate } from "@/util/axios";
import type { AuthResponseType, ChangingPasswordBodyType } from "@/types/AuthTypes";

type BodyType = {
  username: string;
  password: string;
}

export async function login(body: BodyType) {
  try {
    const response = await axiosPrivate.post('/auth/login', body);
    return response.data as AuthResponseType;
  } catch (error) {
    console.error(error);
    const axiosError = error as AxiosError;
    if (axiosError?.response?.status === 401) return axiosError.response.data as AuthResponseType; 
    return null;
  }
}

export async function logout() {
  try {
    const res = await axiosPrivate.get('/auth/logout');
    if (res.status === 200) return true;
    console.error(res);
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function changePassword(axios: AxiosInstance, body: ChangingPasswordBodyType) {
  try {
    await axios.put('/auth', body);
    return { ok: true };
  } catch (error) {
    console.error(error);
    const customError = error as AxiosError;
    const responseData = customError.response?.data as { message: string };
    return { ok: false, msg: responseData?.message || customError.message };
  }
}