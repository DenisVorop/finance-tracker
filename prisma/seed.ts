import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

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

  // Создание счетов
  await prisma.bill.deleteMany(); // Очищаем существующие счета
  const bills = await prisma.bill.createMany({
    data: [
      {
        name: "Основной счёт",
        type: "REGULAR",
        backgroundColor: "#FF5733",
        emoji: "💰",
        balance: 10000.0,
        includeInTotal: true,
        userId: user.id,
      },
      {
        name: "Накопления",
        type: "SAVINGS",
        backgroundColor: "#33FF57",
        emoji: "🏦",
        balance: 50000.0,
        includeInTotal: true,
        userId: user.id,
      },
      {
        name: "Кредит",
        type: "DEBT_OWE",
        backgroundColor: "#5733FF",
        emoji: "💳",
        balance: -15000.0,
        includeInTotal: false,
        userId: user.id,
      },
      {
        name: "Должник",
        type: "DEBT_LEND",
        backgroundColor: "#FFC300",
        emoji: "🤝",
        balance: 7000.0,
        includeInTotal: true,
        userId: user.id,
      },
    ],
  });

  // Получаем ID основного счета
  const mainBill = await prisma.bill.findFirst({
    where: {
      name: "Основной счёт",
      userId: user.id
    }
  });

  if (!mainBill) {
    throw new Error("Основной счет не найден");
  }

  // Создание транзакций
  await prisma.transaction.deleteMany(); // Очищаем существующие транзакции
  await prisma.transaction.createMany({
    data: [
      {
        date: new Date("2025-03-01"),
        amount: -3500,
        description: "Закупка на неделю в супермаркете",
        category: "Продукты",
        billId: mainBill.id
      },
      {
        date: new Date("2025-03-03"),
        amount: -2000,
        description: "Заправка автомобиля",
        category: "Транспорт",
        billId: mainBill.id
      },
      {
        date: new Date("2025-03-04"),
        amount: -1500,
        description: "Вечер с друзьями в кафе",
        category: "Кафе и рестораны",
        billId: mainBill.id
      },
      {
        date: new Date("2025-03-05"),
        amount: 40000,
        description: "Ежемесячная выплата за работу",
        category: "Зарплата",
        billId: mainBill.id
      },
      {
        date: new Date("2025-03-06"),
        amount: -2300,
        description: "Билеты на концерт",
        category: "Развлечения",
        billId: mainBill.id
      },
      {
        date: new Date("2025-03-07"),
        amount: -1200,
        description: "Новые кроссовки для тренировок",
        category: "Одежда и обувь",
        billId: mainBill.id
      }
    ]
  });

  console.log("Seed выполнен успешно");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
