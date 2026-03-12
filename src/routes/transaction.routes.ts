import type { FastifyInstance } from "fastify";
import { zodToJsonSchema } from "zod-to-json-schema";
import createTransactionController from "../controllers/transactions/createTransaction.controller";
import { createTransactionSchema } from "../schemas/transaction.schema";

const transactionRoutes = async (fastify: FastifyInstance): Promise<void> => {
  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      body: zodToJsonSchema(createTransactionSchema as any),
    },
    handler: createTransactionController,
  });
};

export default transactionRoutes;