import { Expense } from "@prisma/client";
import { useMemo } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface ChartProps {
  expenses?: Expense[];
}

export default function Chart({ expenses }: ChartProps) {
  const data = useMemo(
    () =>
      expenses?.map((el) => ({
        date: `${el.month}/${el.date}`,
        amount: el.amount,
      })),
    [expenses]
  );
  return (
    <div style={{ width: "100%", height: 600 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart height={300} data={data}>
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="date" />
          <YAxis tickCount={10} />
          <Line type="monotone" dataKey="amount" />
          <ReferenceLine
            y={0}
            stroke="#ff4d4f"
            strokeWidth={1}
            strokeDasharray="4 2"
          />
          <ReferenceLine
            y={1500}
            stroke="#faad14"
            strokeWidth={1}
            strokeDasharray="4 2"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
