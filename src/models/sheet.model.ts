import { Expense } from "@prisma/client";

export enum SHEET_TYPES {
  MAX = "max",
  JANE = "jane",
  COMMON = "common",
}

export interface ExpenseWithBalance extends Expense {
  balance: number;
}
