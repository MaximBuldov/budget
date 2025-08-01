"use client";

import { SHEET_TYPES } from "@/models/sheet.model";
import { BALANCE_ROUTE } from "@/utils/constants";
import Segmented from "antd/es/segmented";
import { useRouter, useSearchParams } from "next/navigation";

export default function SheetPagination() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSheet = searchParams.get("sheet") as SHEET_TYPES;

  const changeCurrentSheet = (sheet: SHEET_TYPES) => {
    const params = new URLSearchParams(searchParams);
    params.set("sheet", sheet);
    router.push(`${BALANCE_ROUTE}?${params.toString()}`);
  };

  return (
    <Segmented<SHEET_TYPES>
      options={Object.values(SHEET_TYPES).map((type) => type)}
      defaultValue={currentSheet}
      onChange={changeCurrentSheet}
    />
  );
}
