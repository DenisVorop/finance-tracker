## Начало

1. **Создайте файл `.env` в корне проекта**:
Скопируйте в него данные из .env.example
Сгенирируйте секреты командой openssl rand -hex 32 
ACCESS_TOKEN_SECRET=openssl rand -hex 32
REFRESH_TOKEN_SECRET=openssl rand -hex 32
2. **Установите зависимости:**
```bash
sudo npm ci
```
3. **Примените миграции:**
```bash
sudo npx prisma migrate dev --name init
```
4. **Сгенерируйте Prisma Client:**
```bash
sudo npx prisma generate
```
5. **Засейдите базу тестовыми данными (опционально):**
```bash
npm run seed
```
6. **Запустите проект:**
```bash
npm run dev
```