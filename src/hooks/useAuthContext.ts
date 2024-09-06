import { useContext } from "react";

import { AuthContext } from "@/context/AuthProvider";
import type { AuthContextType } from "@/types/AuthTypes";

export default function useAuthContext() {
  return useContext(AuthContext) as AuthContextType;
}