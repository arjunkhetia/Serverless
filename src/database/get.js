import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const json = (param) => {
  return JSON.parse(
    JSON.stringify(param, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
};

export async function handler(event) {
  const users = await prisma.users.findMany();
  return {
    headers: {'Access-Control-Allow-Origin': '*'},
    statusCode: 200,
    body: JSON.stringify(json(users)),
  };
}
