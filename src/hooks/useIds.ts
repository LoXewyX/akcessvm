import { useEffect, useState } from 'react';
import useAxiosPrivate from './useAxiosPrivate';

const useIds = () => {
  const axiosPrivate = useAxiosPrivate();

  const [userData, setUserData] = useState<string[] | []>([]);

  useEffect(() => {
    const controller = new AbortController();
    const getUser = async () => {
      try {
        const response = await axiosPrivate.get('/users/id', {
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
  }, [axiosPrivate]);

  return userData;
};

export default useIds;