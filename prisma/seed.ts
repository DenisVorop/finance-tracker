import type { OperationType } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  // Создание пользователя
  const passwordHash = await bcrypt.hash("adminadmin", 10);
  const user = await prisma.user.upsert({
    where: { email: "admin@yandex.ru" },
    update: {},
    create: {
      email: "admin@yandex.ru",
      name: "admin",
      password: passwordHash,
      role: "ADMIN",
    },
  });

  // Счета
  await prisma.bill.createMany({
    data: [
      {
        name: "Основной счёт",
        type: "REGULAR",
        backgroundColor: "#FF5733",
        emoji: "💰",
        balance: 10000,
        includeInTotal: true,
        userId: user.id,
      },
      {
        name: "Накопления",
        type: "SAVINGS",
        backgroundColor: "#33FF57",
        emoji: "🏦",
        balance: 50000,
        includeInTotal: true,
        userId: user.id,
      },
      {
        name: "Кредит",
        type: "DEBT_OWE",
        backgroundColor: "#5733FF",
        emoji: "💳",
        balance: -15000,
        includeInTotal: false,
        userId: user.id,
      },
      {
        name: "Должник",
        type: "DEBT_LEND",
        backgroundColor: "#FFC300",
        emoji: "🤝",
        balance: 7000,
        includeInTotal: true,
        userId: user.id,
      },
    ],
  });

  const createdBills = await prisma.bill.findMany({
    where: { userId: user.id },
  });

  // Категории
  const categoriesData = [
    { name: "Продукты", description: "Еда и супермаркеты" },
    { name: "Транспорт", description: "Такси, бензин, метро" },
    { name: "Развлечения", description: "Кино, бары, игры" },
    { name: "Доход", description: "Зарплата, фриланс" },
    { name: "Здоровье", description: "Аптеки, врачи" },
    { name: "Подарки", description: "Подарки и праздники" },
  ];

  const categories = await Promise.all(
    categoriesData.map((cat) =>
      prisma.category.create({
        data: {
          ...cat,
          userId: user.id,
        },
      })
    )
  );

  // Операции
  const operations = [];

  for (let i = 0; i < 1000; i++) {
    const isIncome = Math.random() < 0.4;
    const amount = Number(
      faker.finance.amount({ min: 100, max: 3000, dec: 2 })
    );
    const bill = faker.helpers.arrayElement(createdBills);
    const category = faker.helpers.arrayElement(
      categories.filter((c) =>
        isIncome ? c.name === "Доход" : c.name !== "Доход"
      )
    );

    operations.push({
      amount,
      type: (isIncome ? "DEPOSIT" : "WITHDRAWAL") as OperationType,
      userId: user.id,
      billId: bill.id,
      categoryId: category.id,
      note: faker.lorem.words(3),
      date: faker.date.recent({ days: 90 }), // последние 90 дней
    });
  }

  await prisma.operation.createMany({
    data: operations,
  });

  console.log(
    "✅ Seed завершён: пользователь, 4 счёта, 6 категорий, 1000 операций."
  );
}

main()
  .catch((e) => {
    console.error("❌ Ошибка сидирования:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
