import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../provider/AuthProvider";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { userLogout } = useContext(AuthContext);
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      async (error) => {
        toast.error(error?.data?.message);
        if (error.response.status === 401 || error.response.status === 403) {
          // logout
          userLogout();
          // navigate to login
          navigate("/login");
        }
      }
    );
  }, [userLogout, navigate]);
  return axiosSecure;
};

export default useAxiosSecure;
