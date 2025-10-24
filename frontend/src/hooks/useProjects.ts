import { useState, useEffect } from 'react';
import { getProjects, ProjectsResponse } from '@/lib/api';

export const useProjects = (page = 1, limit = 20) => {
  const [data, setData] = useState<ProjectsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getProjects(page, limit);
        setData(response);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Erreur lors du chargement des projets');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [page, limit]);

  return { data, loading, error };
};
