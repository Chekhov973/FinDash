import { CurrencyData, PricePoint } from './CurrencyAPI';

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    tension: number;
    fill: boolean;
  }[];
}

class UpdateGraphicsServiceClass {
  formatChartData(currencyData: CurrencyData | undefined): ChartData {
    if (!currencyData) {
      return {
        labels: [],
        datasets: [],
      };
    }

    const labels = currencyData.history.map(point => 
      new Date(point.timestamp).toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
      })
    );

    const data = currencyData.history.map(point => point.price);

    return {
      labels,
      datasets: [
        {
          label: `${currencyData.name} (${currencyData.symbol})`,
          data,
          borderColor: 'rgba(102, 126, 234, 1)',
          backgroundColor: 'rgba(102, 126, 234, 0.1)',
          tension: 0.4,
          fill: true,
        },
      ],
    };
  }

  formatMultiChartData(currencies: CurrencyData[]): ChartData {
    if (currencies.length === 0) {
      return {
        labels: [],
        datasets: [],
      };
    }

    const colors = [
      'rgba(102, 126, 234, 1)',
      'rgba(118, 75, 162, 1)',
      'rgba(72, 187, 120, 1)',
      'rgba(237, 137, 54, 1)',
      'rgba(214, 48, 49, 1)',
    ];

    const maxLength = Math.max(...currencies.map(c => c.history.length));
    const labels = currencies[0].history.map(point =>
      new Date(point.timestamp).toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
      })
    );

    const datasets = currencies.map((currency, index) => ({
      label: `${currency.name} (${currency.symbol})`,
      data: currency.history.map(point => point.price),
      borderColor: colors[index % colors.length],
      backgroundColor: colors[index % colors.length].replace('1)', '0.1)'),
      tension: 0.4,
      fill: false,
    }));

    return {
      labels,
      datasets,
    };
  }

  calculateNormalizedData(currencies: CurrencyData[]): ChartData {
    if (currencies.length === 0) {
      return {
        labels: [],
        datasets: [],
      };
    }

    const colors = [
      'rgba(102, 126, 234, 1)',
      'rgba(118, 75, 162, 1)',
      'rgba(72, 187, 120, 1)',
      'rgba(237, 137, 54, 1)',
      'rgba(214, 48, 49, 1)',
    ];

    const labels = currencies[0].history.map(point =>
      new Date(point.timestamp).toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
      })
    );

    const datasets = currencies.map((currency, index) => {
      const firstPrice = currency.history[0].price;
      const normalizedData = currency.history.map(point => 
        ((point.price - firstPrice) / firstPrice) * 100
      );

      return {
        label: `${currency.name} (${currency.symbol})`,
        data: normalizedData,
        borderColor: colors[index % colors.length],
        backgroundColor: colors[index % colors.length].replace('1)', '0.1)'),
        tension: 0.4,
        fill: false,
      };
    });

    return {
      labels,
      datasets,
    };
  }
}

export const UpdateGraphicsService = new UpdateGraphicsServiceClass();

