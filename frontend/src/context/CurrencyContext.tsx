import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { CurrencyData } from '../services/CurrencyAPI';
import { WebSocketService } from '../services/WebSocketService';

interface CurrencyContextType {
  currencies: Map<string, CurrencyData>;
  selectedCurrency: string | null;
  selectCurrency: (symbol: string) => void;
  addCurrency: (data: CurrencyData) => void;
  removeCurrency: (symbol: string) => void;
  subscribeToCurrency: (symbol: string) => void;
  unsubscribeFromCurrency: (symbol: string) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currencies, setCurrencies] = useState<Map<string, CurrencyData>>(new Map());
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const [subscriptions, setSubscriptions] = useState<Map<string, () => void>>(new Map());

  const addCurrency = useCallback((data: CurrencyData) => {
    setCurrencies(prev => {
      const next = new Map(prev);
      next.set(data.symbol, data);
      return next;
    });
  }, []);

  const removeCurrency = useCallback((symbol: string) => {
    setCurrencies(prev => {
      const next = new Map(prev);
      next.delete(symbol);
      return next;
    });
  }, []);

  const subscribeToCurrency = useCallback((symbol: string) => {
    if (subscriptions.has(symbol)) {
      return;
    }

    const unsubscribe = WebSocketService.subscribe(symbol, (data) => {
      addCurrency(data);
    });

    setSubscriptions(prev => {
      const next = new Map(prev);
      next.set(symbol, unsubscribe);
      return next;
    });
  }, [addCurrency, subscriptions]);

  const unsubscribeFromCurrency = useCallback((symbol: string) => {
    const unsubscribe = subscriptions.get(symbol);
    if (unsubscribe) {
      unsubscribe();
      setSubscriptions(prev => {
        const next = new Map(prev);
        next.delete(symbol);
        return next;
      });
    }
  }, [subscriptions]);

  const selectCurrency = useCallback((symbol: string) => {
    setSelectedCurrency(symbol);
  }, []);

  useEffect(() => {
    return () => {
      subscriptions.forEach(unsubscribe => unsubscribe());
      WebSocketService.disconnect();
    };
  }, [subscriptions]);

  const value = {
    currencies,
    selectedCurrency,
    selectCurrency,
    addCurrency,
    removeCurrency,
    subscribeToCurrency,
    unsubscribeFromCurrency,
  };

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}

