import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';
import { ValueLocator } from './ValueLocator';
import { CurrencyCard } from './CurrencyCard';
import { ChartsView } from './ChartsView';
import '../styles/Dashboard.css';

export function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { currencies } = useCurrency();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const currencyArray = Array.from(currencies.values());

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">FinDash</h1>
        <div className="dashboard-user">
          <span className="user-email">{user?.email}</span>
          <button onClick={handleLogout} className="logout-button">
            Выйти
          </button>
        </div>
      </header>
      
      <main className="dashboard-content">
        <div className="dashboard-grid">
          <div className="sidebar">
            <ValueLocator />
            
            <div className="currencies-list">
              <h3 className="currencies-title">Отслеживаемые валюты</h3>
              {currencyArray.length === 0 ? (
                <div className="empty-currencies">
                  <p>Добавьте валюту для отслеживания</p>
                </div>
              ) : (
                <div className="currency-cards">
                  {currencyArray.map((currency) => (
                    <CurrencyCard key={currency.symbol} symbol={currency.symbol} />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="main-content">
            <ChartsView />
          </div>
        </div>
      </main>
    </div>
  );
}

