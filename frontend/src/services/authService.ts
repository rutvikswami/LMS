import api from './api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  user_name: string;
  password: string;
  group: 'Student' | 'Creator';
}

export interface AuthResponse {
  access: string;
  refresh: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/accounts/login/', credentials);
    return response.data;
  },

  async register(data: RegisterData): Promise<void> {
    await api.post('/accounts/signup/', data);
  },

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  },
};
