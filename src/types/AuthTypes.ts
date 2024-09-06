import { ServerErrorType } from "./ErrorTypes";

export type AuthContextType = {
  loggedIn: boolean;
  accessToken: string;
  setAuth: React.Dispatch<React.SetStateAction<{
    loggedIn: boolean;
    accessToken: string;
  }>>;
}

export type AuthResponseType = {
  ok: true,
  accessToken: string;
} | ServerErrorType;

export type ChangingPasswordBodyType = {
  password: string; 
  newPassword: string;
  newPasswordRepeat: string;
}