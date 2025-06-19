## 🚀 Быстрый старт

1. **Создайте `.env` файл на основе шаблона**

   Выполните команду:

   ```bash
   cp .env.example .env
   ```

   Затем:

   - Сгенерируйте два уникальных секрета с помощью команды:

     ```bash
     openssl rand -hex 32
     ```

   - Вставьте полученные значения в `.env`:

     ```env
     ACCESS_TOKEN_SECRET=ваш_секрет_1
     REFRESH_TOKEN_SECRET=ваш_секрет_2
     ```

   - ⚠️ **Важно:** замените `ACCESS_TOKEN_EXPIRY` и `REFRESH_TOKEN_EXPIRY` на числовые значения (результат выражения):

     ```env
     ACCESS_TOKEN_EXPIRY=300       # 5 минут
     REFRESH_TOKEN_EXPIRY=86400    # 1 день
     ```

2. **Установите зависимости**

   ```bash
   sudo npm ci
   ```

3. **Примените миграции**

   ```bash
   sudo npx prisma migrate dev --name init
   ```

4. **Сгенерируйте Prisma Client**

   ```bash
   sudo npx prisma generate
   ```

5. **(Опционально) Засейдите базу тестовыми данными**

   ```bash
   npm run seed
   ```
   > 🧪 **Тестовая учётная запись для входа:**  
   > **Email:** `admin@yandex.ru`  
   > **Пароль:** `adminadmin`

6. **Запустите проект**

   ```bash
   npm run dev
   ```

---
🌐 **Демо-ссылка:** [https://finance-tracker-iota-six.vercel.app/bills](https://finance-tracker-iota-six.vercel.app/bills)