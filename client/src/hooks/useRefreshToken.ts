import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToke = () => {
  const { accessToken, refreshToken, setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.post(
      "/refresh",
      { token: refreshToken },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log(response);
    setAuth({ accessToken: response.data.accessToken });

    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToke;
