import { prisma } from "@/lib/prisma";
import { SHEET_TYPES } from "@/models/sheet.model";
import { getJanePaydays, getMaxPaydays } from "@/utils/helpers";
import { Expense } from "@prisma/client";
import dayjs from "dayjs";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const user = searchParams.get("user");
  const userId =
    user === SHEET_TYPES.COMMON ? undefined : user === SHEET_TYPES.MAX ? 1 : 2;
  try {
    const expenses = await prisma.expense.findMany({
      where: {
        userId,
      },
    });
    const debit = await prisma.balanceSnapshot.findMany({
      where: {
        userId,
      },
      include: {
        user: true,
      },
    });
    const salary = await prisma.income.findMany({
      where: {
        userId,
      },
      include: {
        user: true,
      },
    });
    salary.forEach((el) => {
      const dates =
        el.userId === 1 ? getMaxPaydays() : getJanePaydays(el.startDate);
      dates.forEach((date, index) => {
        expenses.push({
          id: `salary_${el.userId}_${date}_${index}`,
          label: `Salary ${el.user.name}`,
          userId: el.userId,
          date,
          amount: el.amount,
          month: Math.ceil((index + 1) / 2),
        });
      });
    });

    expenses.sort((a, b) => {
      const getPriority = (obj: Expense) => {
        if (obj.month === 1 && obj.date > +dayjs().format("D")) return 1;
        if (obj.month === 2) return 2;
        return 3;
      };

      const prioA = getPriority(a);
      const prioB = getPriority(b);

      if (prioA !== prioB) {
        return prioA - prioB;
      }

      return a.date - b.date;
    });

    const expenseWithMonth = expenses.map((el) => {
      const nextMonth = el.date < dayjs().date() && el.month === 1 ? 2 : 0;
      return {
        ...el,
        month: el.month && el.month + dayjs().month() + nextMonth,
      };
    });

    expenseWithMonth.unshift(
      ...debit.map((el) => ({
        id: el.id,
        label: `Base ${el.user.name}`,
        userId: el.userId,
        date: dayjs(el.date).date(),
        amount: el.amount,
        month: +dayjs(el.date).format("M"),
        isExpense: false,
      }))
    );
    return NextResponse.json(expenseWithMonth);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { month, ...data }: Expense = await req.json();
    if (data.label.includes("Base")) {
      await prisma.balanceSnapshot.update({
        where: { id: data.id },
        data: {
          amount: data.amount,
          date: new Date(),
        },
      });
    } else {
      await prisma.expense.update({
        where: { id: data.id },
        data,
      });
    }
    return NextResponse.json({
      status: "ok",
    });
  } catch {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const data: Expense = await req.json();
    await prisma.expense.delete({
      where: { id: data.id },
    });
    return NextResponse.json({
      status: "ok",
    });
  } catch {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
