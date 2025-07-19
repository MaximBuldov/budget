import { SHEET_TYPES } from "@/models/sheet.model";
import { Expense } from "@prisma/client";

export async function getExpenses(user: SHEET_TYPES): Promise<Expense[]> {
  const params = new URLSearchParams({
    user,
  });
  const res = await fetch(`/api/expenses?${params.toString()}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to fetch expenses");
  }

  return res.json();
}

export async function updateExpense(data: Partial<Expense>) {
  const res = await fetch(`/api/expenses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to fetch expenses");
  }

  return res.json();
}

export async function deleteExpense(data: Expense | null) {
  const res = await fetch(`/api/expenses`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to fetch expenses");
  }

  return res.json();
}
