import axios from 'axios';
import { getToken } from './auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Avoid hanging requests when a platform is cold or unreachable
  timeout: 15000,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const method = error.config?.method?.toLowerCase();
    const url = error.config?.url || '';

    // Do not redirect on GET 401s (public reads) or on the login endpoint
    if (
      status === 401 &&
      method !== 'get' &&
      !url.includes('/auth')
    ) {
      localStorage.removeItem('token');
      // If user is in admin area, send back to login
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  coverImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectsResponse {
  data: Project[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface AuthPayload {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

// Projects API
export const getProjects = async (page = 1, limit = 20): Promise<ProjectsResponse> => {
  const response = await api.get<ProjectsResponse>('/projets', {
    params: { page, limit },
  });
  return response.data;
};

export const getProject = async (id: string): Promise<Project> => {
  const response = await api.get<Project>(`/projets/${id}`);
  return response.data;
};

export const createProject = async (payload: Omit<Project, '_id' | 'createdAt' | 'updatedAt'>): Promise<Project> => {
  const response = await api.post<Project>('/projets', payload);
  return response.data;
};

export const updateProject = async (id: string, payload: Partial<Omit<Project, '_id' | 'createdAt' | 'updatedAt'>>): Promise<Project> => {
  const response = await api.put<Project>(`/projets/${id}`, payload);
  return response.data;
};

export const deleteProject = async (id: string): Promise<void> => {
  await api.delete(`/projets/${id}`);
};

// Contact API
export const postContact = async (payload: ContactPayload): Promise<{ message: string }> => {
  const response = await api.post<{ message: string }>('/contact', payload);
  return response.data;
};

// Auth API
export const login = async (payload: AuthPayload): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth', payload);
  return response.data;
};

export default api;
