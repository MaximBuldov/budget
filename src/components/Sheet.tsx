"use client";
import { ExpenseWithBalance } from "@/models/sheet.model";
import { Expense } from "@prisma/client";
import Table, { TableProps } from "antd/es/table";
import Tag from "antd/es/tag";
import { useState } from "react";
import ExpenseDrawer from "./ExpenseDrawer";

const columns: TableProps<Expense>["columns"] = [
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
    dataIndex: "balance",
    key: "balance",
    render: (el) => (
      <Tag
        color={el < 1500 && el > 0 ? "warning" : el < 0 ? "error" : "success"}
      >
        {el}
      </Tag>
    ),
  },
];

interface SheetProps {
  data?: ExpenseWithBalance[];
  refetch: () => void;
  isPending: boolean;
}

export default function Sheet({ data, isPending, refetch }: SheetProps) {
  const [drawer, setDrawer] = useState<Expense | null>(null);
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
