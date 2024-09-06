import { createContext, useState } from "react";

import type { AuthContextType } from "@/types/AuthTypes";


type Props = {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType>({ loggedIn: false, accessToken: '', setAuth: () => {}});

export default function AuthProvider({ children }: Props) {
  const [auth, setAuth] = useState({ loggedIn: false, accessToken: '' });
  
  return (
    <AuthContext.Provider value={{ loggedIn: auth.loggedIn, accessToken: auth.accessToken, setAuth }} >
      {children}
    </AuthContext.Provider>
  )
} 