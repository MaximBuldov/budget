"use client";
import { SHEET_TYPES } from "@/models/sheet.model";
import { getExpenses } from "@/services/expenses";
import { balance } from "@/utils/helpers";
import { useQuery } from "@tanstack/react-query";
import Tabs from "antd/es/tabs";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import Chart from "./Chart";
import Sheet from "./Sheet";
import SheetPagination from "./SheetPagination";

enum TabsTypes {
  TABLE = "table",
  CHART = "chart",
}

export default function Balance() {
  const searchParams = useSearchParams();
  const sheet = searchParams.get("sheet") as SHEET_TYPES;
  const { data, isPending, refetch } = useQuery({
    queryFn: () => getExpenses(sheet),
    queryKey: [sheet],
  });

  const dataWithBalance = useMemo(
    () =>
      data?.map((el, index) => ({
        ...el,
        balance: balance(index, data),
      })),
    [data]
  );
  return (
    <Tabs
      type="card"
      tabBarExtraContent={<SheetPagination />}
      items={[
        {
          label: "Table",
          key: TabsTypes.TABLE,
          children: (
            <Sheet
              data={dataWithBalance}
              refetch={refetch}
              isPending={isPending}
            />
          ),
        },
        {
          label: "Chart",
          key: TabsTypes.CHART,
          children: <Chart expenses={dataWithBalance} />,
        },
      ]}
    />
  );
}
