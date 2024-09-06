import { axiosPublic } from "@/util/axios";
import useAuthContext from "./useAuthContext";

export default function useRefreshToken() {
  const { setAuth } = useAuthContext();
  
  const refresh = async () => {
    const response = await axiosPublic.get('/auth/refresh', { withCredentials: true});
    
    if (response.status === 200) {
      const { data: { accessToken } } = response;
      setAuth({ accessToken, loggedIn: true });
    }
  }

  return refresh;
}