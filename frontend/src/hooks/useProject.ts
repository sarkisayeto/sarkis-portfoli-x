import { useState, useEffect } from 'react';
import { getProject, Project } from '@/lib/api';

export const useProject = (id: string) => {
  const [data, setData] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getProject(id);
        setData(response);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Erreur lors du chargement du projet');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  return { data, loading, error };
};
