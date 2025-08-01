import { ExpenseWithBalance } from "@/models/sheet.model";
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
  expenses?: ExpenseWithBalance[];
}

export default function Chart({ expenses }: ChartProps) {
  const data = useMemo(
    () =>
      expenses?.map((el) => ({
        date: `${el.month}/${el.date}`,
        amount: el.balance,
      })),
    [expenses]
  );
  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tickCount={10} tick={{ fontSize: 10 }} />
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
