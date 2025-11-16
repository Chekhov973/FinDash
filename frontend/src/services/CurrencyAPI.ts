export interface CurrencyData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  timestamp: number;
  history: PricePoint[];
}

export interface PricePoint {
  timestamp: number;
  price: number;
}

const MOCK_CURRENCIES = [
  { symbol: 'BTC', name: 'Bitcoin', basePrice: 45000 },
  { symbol: 'ETH', name: 'Ethereum', basePrice: 2500 },
  { symbol: 'USDT', name: 'Tether', basePrice: 1 },
  { symbol: 'BNB', name: 'Binance Coin', basePrice: 350 },
  { symbol: 'XRP', name: 'Ripple', basePrice: 0.6 },
  { symbol: 'SOL', name: 'Solana', basePrice: 100 },
  { symbol: 'ADA', name: 'Cardano', basePrice: 0.5 },
];

function generateHistory(basePrice: number, points: number = 20): PricePoint[] {
  const history: PricePoint[] = [];
  const now = Date.now();
  let currentPrice = basePrice;

  for (let i = points; i >= 0; i--) {
    const volatility = 0.02;
    const change = (Math.random() - 0.5) * 2 * volatility;
    currentPrice = currentPrice * (1 + change);

    history.push({
      timestamp: now - i * 60000,
      price: currentPrice,
    });
  }

  return history;
}

class CurrencyAPIService {
  async fetchCurrencyData(symbol: string): Promise<CurrencyData> {
    await new Promise(resolve => setTimeout(resolve, 500));

    const currency = MOCK_CURRENCIES.find(c => c.symbol === symbol);
    if (!currency) {
      throw new Error(`Currency ${symbol} not found`);
    }

    const history = generateHistory(currency.basePrice);
    const currentPrice = history[history.length - 1].price;
    const previousPrice = history[history.length - 2].price;
    const change24h = ((currentPrice - previousPrice) / previousPrice) * 100;

    return {
      symbol: currency.symbol,
      name: currency.name,
      price: currentPrice,
      change24h,
      timestamp: Date.now(),
      history,
    };
  }

  async fetchAvailableCurrencies() {
    await new Promise(resolve => setTimeout(resolve, 200));
    return MOCK_CURRENCIES;
  }
}

export const CurrencyAPI = new CurrencyAPIService();

