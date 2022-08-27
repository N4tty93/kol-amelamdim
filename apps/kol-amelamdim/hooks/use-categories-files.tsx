import { useEffect, useState } from 'react';
import { IFile } from '@kol-amelamdim/types';
import axios from '../api';

export const useCategoriesFiles = (category: string) => {
  const [files, setFiles] = useState<IFile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getFiles = async () => {
    if (category) {
      const { data } = await axios.get(`/api/category/${category}`);
      return data.files;
    }
  };

  useEffect(() => {
    setLoading(true);
    getFiles()
      .then((d) => {
        setFiles(d);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, [category]);

  return { files, loading, error };
};
