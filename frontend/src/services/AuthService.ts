import CryptoJS from 'crypto-js';

const API_BASE_URL = '/api';

export interface LoginCredentials {
  login: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name?: string;
  };
}

class AuthServiceClass {
  private encryptPassword(password: string): string {
    return CryptoJS.AES.encrypt(password, 'secret-key').toString();
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const encryptedPassword = this.encryptPassword(credentials.password);

    const response = await fetch(`${API_BASE_URL}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: credentials.login,
        password: encryptedPassword,
      }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Неверный логин или пароль');
      }
      if (response.status >= 500) {
        throw new Error('Ошибка сервера. Попробуйте позже');
      }
      throw new Error('Ошибка авторизации');
    }

    const data: AuthResponse = await response.json();
    return data;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export const AuthService = new AuthServiceClass();

