import DashboardInitRedirect from "@/components/DashboardInitRedirect";
import Sheet from "@/components/Sheet";
import SheetPagination from "@/components/SheetPagination";
import Space from "antd/es/space";

export default async function Balance() {
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <SheetPagination />
      <DashboardInitRedirect />
      <Sheet />
    </Space>
  );
}
