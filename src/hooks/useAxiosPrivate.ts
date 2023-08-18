import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import { AxiosInstance, AxiosRequestConfig, AxiosHeaders } from "axios";

interface InternalAxiosRequestConfig extends AxiosRequestConfig {
  sent?: boolean;
  headers: AxiosHeaders;
}

const useAxiosPrivate = (): AxiosInstance => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (!config.headers) config.headers = new AxiosHeaders();
        if (!config.headers.get("Authorization"))
          config.headers.set("Authorization", `Bearer ${auth?.accessToken}`);
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config as InternalAxiosRequestConfig;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers.set("Authorization", `Bearer ${newAccessToken}`);
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
