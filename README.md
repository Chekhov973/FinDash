# FinDash - Financial Dashboard

Современное веб-приложение для управления финансами с real-time отслеживанием криптовалют.

## Структура проекта

```
FinDash/
├── frontend/          # React фронтенд приложение
│   ├── src/
│   │   ├── components/    # React компоненты
│   │   ├── context/       # Context API для состояния
│   │   ├── services/      # Сервисы (API, WebSocket)
│   │   └── styles/        # CSS стили
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## Быстрый старт

```bash
cd frontend
npm install
npm run dev
```

Откройте http://localhost:5173

## Функционал

### Авторизация
- Форма авторизации с валидацией
- Шифрование паролей (AES)
- Сохранение токенов в localStorage
- Защищенные маршруты

**Тестовые данные:**
- Email: test@example.com
- Password: любой

### Real-time отслеживание валют
- Добавление/удаление валют
- Live обновление цен через WebSocket (эмулируется)
- Интерактивные графики (Chart.js)
- История изменений цен
- Визуализация процентных изменений

### Отчёты
- Формирование отчётов по валютам
- Выбор периода и интервала
- Генерация PDF и CSV отчётов
- История созданных отчётов
- Скачивание отчётов
- Статистика (мин/макс/средняя цена)

## Технологии

### Frontend
- React 19 + TypeScript
- React Router - маршрутизация
- React Context API - управление состоянием
- Chart.js + react-chartjs-2 - графики
- WebSocket - real-time обновления
- jsPDF + jspdf-autotable - генерация PDF
- Vite - сборщик

### Стек
- ESLint + Stylelint - линтеры
- Prettier - форматирование
- CryptoJS - шифрование

## Разработка

```bash
cd frontend

npm run dev          # Dev сервер
npm run build        # Продакшн сборка
npm run lint         # Проверка ESLint
npm run preview      # Просмотр продакшн сборки
```

## Архитектура

### Авторизация
1. AuthView - форма входа
2. AuthService - API авторизации
3. AuthContext - глобальное состояние
4. Confirm - подтверждение входа
5. PrivateRoute - защита маршрутов

### Валюты и графики
1. ValueLocator - выбор валюты
2. CurrencyAPI - загрузка данных
3. WebSocketService - real-time обновления
4. CurrencyContext - состояние валют
5. UpdateGraphicsService - форматирование данных для графиков
6. ChartsView - отображение графиков

### Отчёты
1. ReportForm - форма параметров отчёта
2. ReportService - генерация PDF/CSV
3. ReportContext - состояние отчётов
4. ReportHistory - таблица истории
5. ReportsPage - страница отчётов

## Дизайн

Градиентный дизайн: голубой (#667eea) → светло-фиолетовый (#764ba2)
- Полупрозрачные карточки с backdrop blur
- Плавные анимации
- Адаптивная верстка
- Современный UI/UX

## Лицензия

MIT
