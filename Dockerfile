# Шаг 1: Берем официальный образ Node.js
FROM node:20-alpine AS builder

# Шаг 2: Создаем папку для приложения
WORKDIR /app

# Шаг 3: Копируем package.json и package-lock.json
COPY package*.json ./

# Шаг 4: Устанавливаем зависимости
RUN npm ci

# Шаг 5: Копируем ВЕСЬ код проекта
COPY . .

# Шаг 6: Собираем приложение для продакшена
RUN npm run build

# Шаг 7: Берем легкий веб-сервер nginx
FROM nginx:alpine

# Шаг 8: Копируем собранное приложение в nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Шаг 9: Открываем порт 80 (стандартный для сайтов)
EXPOSE 80

# Шаг 10: Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
