import { useState, useEffect } from 'react';
import { CurrencyAPI } from '../services/CurrencyAPI';
import { useCurrency } from '../context/CurrencyContext';
import '../styles/ValueLocator.css';

interface Currency {
  symbol: string;
  name: string;
}

export function ValueLocator() {
  const [availableCurrencies, setAvailableCurrencies] = useState<Currency[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  
  const { addCurrency, subscribeToCurrency, currencies } = useCurrency();

  useEffect(() => {
    loadAvailableCurrencies();
  }, []);

  const loadAvailableCurrencies = async () => {
    try {
      const data = await CurrencyAPI.fetchAvailableCurrencies();
      // Ensure we have an array of objects with symbol and name
      const formattedData = data.map((item: any) => {
        if (typeof item === 'string') {
          return { symbol: item, name: item };
        }
        return {
          symbol: item.symbol || item.code || '',
          name: item.name || item.name_full || item.symbol || item.code || '',
        };
      }).filter((item: Currency) => item.symbol && item.name);
      
      setAvailableCurrencies(formattedData);
      if (formattedData.length > 0) {
        setSelectedSymbol(formattedData[0].symbol);
      }
    } catch (err) {
      console.error('Error loading currencies:', err);
      setError('Не удалось загрузить список валют');
    }
  };

  const handleAddCurrency = async () => {
    if (!selectedSymbol) return;

    if (currencies.has(selectedSymbol)) {
      setError('Эта валюта уже добавлена');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const data = await CurrencyAPI.fetchCurrencyData(selectedSymbol);
      addCurrency(data);
      subscribeToCurrency(selectedSymbol);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки данных');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="value-locator">
      <div className="locator-header">
        <h3 className="locator-title">Добавить валюту</h3>
      </div>

      <div className="locator-content">
        <div className="currency-selector">
          <select
            value={selectedSymbol}
            onChange={(e) => setSelectedSymbol(e.target.value)}
            className="currency-select"
            disabled={isLoading}
          >
            {availableCurrencies.map((currency) => {
              const displayName = currency.name || currency.symbol || '';
              const displaySymbol = currency.symbol || '';
              return (
                <option key={displaySymbol} value={displaySymbol}>
                  {displayName} ({displaySymbol})
                </option>
              );
            })}
          </select>

          <button
            onClick={handleAddCurrency}
            className="add-button"
            disabled={isLoading || !selectedSymbol}
          >
            {isLoading ? 'Загрузка...' : 'Добавить'}
          </button>
        </div>

        {error && <div className="locator-error">{error}</div>}
      </div>
    </div>
  );
}

