"use client";
import { SHEET_TYPES } from "@/models/sheet.model";
import { getExpenses } from "@/services/expenses";
import { Expense } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import Divider from "antd/es/divider";
import Table, { TableProps } from "antd/es/table";
import Tag from "antd/es/tag";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import Chart from "./Chart";
import ExpenseDrawer from "./ExpenseDrawer";

export default function Sheet() {
  const searchParams = useSearchParams();
  const sheet = searchParams.get("sheet") as SHEET_TYPES;
  const { data, isPending, refetch } = useQuery({
    queryFn: () => getExpenses(sheet),
    queryKey: [sheet],
  });
  const [drawer, setDrawer] = useState<Expense | null>(null);
  const columns: TableProps<Expense>["columns"] = useMemo(
    () => [
      {
        title: "What",
        dataIndex: ["label"],
        key: "label",
      },
      {
        title: "When",
        dataIndex: ["date"],
        key: "date",
        render: (el, { month }: Expense) => `${month}/${el}`,
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
      },
      {
        title: "Balance",
        key: "balance",
        render: (_, __, index) => (
          <Tag
            color={
              balance(index, data) < 1500 && balance(index, data) > 0
                ? "warning"
                : balance(index, data) < 0
                  ? "error"
                  : "success"
            }
          >
            {balance(index, data)}
          </Tag>
        ),
      },
    ],
    [data]
  );

  return (
    <>
      <Table
        pagination={false}
        dataSource={data}
        columns={columns}
        size="small"
        bordered
        rowKey={(el) => el.id}
        loading={isPending}
        onRow={(record) => ({
          onClick: () => {
            if (!record.label.includes("Salary")) {
              setDrawer(record);
            }
          },
        })}
      />
      <Divider />
      <Chart expenses={data} />
      <ExpenseDrawer
        data={drawer}
        onClose={(ref?: boolean) => {
          setDrawer(null);
          if (ref) {
            refetch();
          }
        }}
      />
    </>
  );
}

function balance(index: number, data?: Expense[]) {
  return Math.round(
    data?.slice(0, index + 1).reduce((acc, el) => acc + el.amount, 0) || 0
  );
}
