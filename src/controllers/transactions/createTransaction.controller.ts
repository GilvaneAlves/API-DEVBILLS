import type { FastifyReply, FastifyRequest } from "fastify";
import { createTransactionSchema } from "../../schemas/transaction.schema";
import prisma from "../../config/prisma";

const createTransactionController = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {

  const userId = "sadsiandin12123"; // Substitua pelo ID do usuário autenticado

  if (!userId) {
    return reply.status(401).send({ error: "Unauthorized" });
  }

  const result = createTransactionSchema.safeParse(request.body);

  if (!result.success) {
    const errorMessages =
      result.error.issues[0]?.message || "Invalid input data";

    return reply.status(400).send({ error: errorMessages });
  }

  const transaction = result.data;

  try {
    const category = await prisma.category.findFirst({
      where: {
        id: transaction.categoryId,
        type: transaction.type,
      },
    });

    if (!category) {
      return reply.status(400).send({ error: "Invalid category ID or type" });
    }

    const parsedDate = new Date(transaction.date);

    const newTransaction = await prisma.transaction.create({
      data: {
        ...transaction,
        userId,
        date: parsedDate,
      },
      include: {
        category: true,
      },
    });

    return reply.status(201).send(newTransaction);

  } catch (error) {
    console.error("Error creating transaction:", error);
    return reply.status(500).send({ error: "Internal Server Error" });
  }
};

export default createTransactionController;