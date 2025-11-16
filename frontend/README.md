# FinDash - Financial Dashboard

Современное веб-приложение для управления финансами с красивым интерфейсом и градиентным дизайном.

## Стек технологий

### Frontend
- React 19
- TypeScript
- Redux Toolkit
- React Router
- Chart.js
- WebSocket
- Vite

### Линтеры
- ESLint
- Stylelint
- Prettier

## Установка

```bash
npm install
```

## Запуск

### Режим разработки
```bash
npm run dev
```

### Продакшн сборка
```bash
npm run build
npm run preview
```

## Структура проекта

```
src/
├── components/          # React компоненты
│   ├── AuthView.tsx    # Форма авторизации
│   ├── Confirm.tsx     # Подтверждение входа
│   ├── Dashboard.tsx   # Главная панель
│   └── PrivateRoute.tsx # Защищенный маршрут
├── context/            # React Context
│   └── AuthContext.tsx # Контекст авторизации
├── services/           # Сервисы
│   └── AuthService.ts  # Сервис авторизации
├── styles/             # CSS стили
│   ├── AuthView.css
│   ├── Confirm.css
│   └── Dashboard.css
├── App.tsx             # Главный компонент
├── main.tsx            # Точка входа
└── index.css           # Глобальные стили
```

## Функционал авторизации

### Компоненты

#### AuthView
- Форма с полями логин (email) и пароль
- Валидация на клиенте:
  - Оба поля обязательны
  - Email проверяется на корректность
- Индикатор загрузки при отправке запроса
- Вывод ошибок при неудачной авторизации

#### AuthService
- Шифрование пароля перед отправкой (AES)
- POST запрос на `/api/auth` с JSON:
  ```json
  {
    "login": "user@example.com",
    "password": "encrypted_password"
  }
  ```
- Ожидаемый ответ:
  ```json
  {
    "token": "jwt_token",
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "name": "User Name"
    }
  }
  ```
- Обработка ошибок (401, 5xx, сетевые)

#### Confirm
- Отображение успешной авторизации
- Сохранение токена в localStorage
- Автоматическое перенаправление на Dashboard через 3 секунды

#### Dashboard
- Защищенная страница (требует авторизации)
- Отображение информации о пользователе
- Функция выхода из системы

### Маршруты

- `/` - Страница авторизации
- `/confirm` - Подтверждение входа (защищенный)
- `/dashboard` - Панель управления (защищенный)

## Дизайн

Приложение использует современный градиентный дизайн:
- Основной градиент: голубой (#667eea) → светло-фиолетовый (#764ba2)
- Полупрозрачные карточки с эффектом blur
- Плавные анимации и переходы
- Адаптивная верстка для мобильных устройств

## Скрипты

```bash
npm run dev              # Запуск dev сервера
npm run build            # Продакшн сборка
npm run lint             # Проверка ESLint
npm run prettier:check   # Проверка форматирования
npm run prettier:fix     # Исправление форматирования
npm run test:unit        # Unit тесты
npm run test:e2e         # E2E тесты
```

## API Backend

Для работы приложения необходим backend с эндпоинтом авторизации:

```
POST /api/auth
Content-Type: application/json

{
  "login": "user@example.com",
  "password": "encrypted_password"
}

Response 200:
{
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name"
  }
}

Response 401:
{
  "error": "Invalid credentials"
}
```

## Разработка

1. Клонируйте репозиторий
2. Установите зависимости: `npm install`
3. Запустите dev сервер: `npm run dev`
4. Откройте http://localhost:5173

## Требования

- Node.js >= 18
- npm >= 9
