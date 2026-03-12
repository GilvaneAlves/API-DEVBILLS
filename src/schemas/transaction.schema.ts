import { z } from "zod";
import { ObjectId } from "mongodb";
import { TransactionType } from "@prisma/client";


const isValidObjectId = (id: string) => ObjectId.isValid(id);

export const createTransactionSchema = z.object({
  description: z.string().min(1, "Description is required"),

  amount: z.coerce.number().positive("Amount must be a positive number"),

  date: z.coerce.date({
    message: "Invalid date format",
  }),

  categoryId: z.string().refine(isValidObjectId, {
    message: "Invalid category ID",
  }),

  type: z.enum([TransactionType.expense, TransactionType.income], {
    message: "Type must be either 'income' or 'expense'",
  }),
});