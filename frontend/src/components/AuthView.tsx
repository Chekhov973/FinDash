import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/AuthService';
import { useAuth } from '../context/AuthContext';
import '../styles/AuthView.css';

export function AuthView() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!login || !password) {
      setError('Заполните все поля');
      return;
    }

    if (!validateEmail(login)) {
      setError('Введите корректный email');
      return;
    }

    setIsLoading(true);

    try {
      const response = await AuthService.login({ login, password });
      authLogin(response.token, response.user);
      navigate('/confirm');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Авторизация</h1>
        <p className="auth-subtitle">Войдите в свой аккаунт</p>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="login" className="form-label">
              Email
            </label>
            <input
              id="login"
              type="email"
              className="form-input"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="example@mail.com"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Пароль
            </label>
            <input
              id="password"
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? 'Загрузка...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  );
}

