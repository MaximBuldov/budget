import DashboardInitRedirect from "@/components/DashboardInitRedirect";
import Sheet from "@/components/Sheet";
import SheetPagination from "@/components/SheetPagination";
import Space from "antd/es/space";
import Spin from "antd/es/spin";
import { Suspense } from "react";

export default async function Balance() {
  return (
    <Suspense fallback={<Spin fullscreen spinning />}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <SheetPagination />
        <DashboardInitRedirect />
        <Sheet />
      </Space>
    </Suspense>
  );
}
