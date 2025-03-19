import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Создание пользователя
  const passwordHash = await bcrypt.hash("adminadmin", 10);
  const user = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      email: "admin@yandex.ru",
      name: "admin",
      password: passwordHash,
      role: "ADMIN",
    },
  });

  await prisma.bill.createMany({
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
