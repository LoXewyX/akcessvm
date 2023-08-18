import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { IUser } from "../api/models";

const useUserData = (data: IUser) => {
  const axiosPrivate = useAxiosPrivate();

  const [userData, setUserData] = useState<IUser | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const getUser = async () => {
      try {
        const response = await axiosPrivate.post("/users/me", data, {
          signal: controller.signal,
        });
        setUserData(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getUser();

    return () => {
      controller.abort();
    };
  }, [axiosPrivate, data]);

  return userData;
};

export default useUserData;
