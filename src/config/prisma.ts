import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const prismaConnect = async () => {
  try {
    await prisma.$connect();
    console.log("DB connected.");
  } catch (error) {
    console.error("Error connecting to DB:", error);
  }
};

export default prisma;