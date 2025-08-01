import Balance from "@/components/Balance";
import DashboardInitRedirect from "@/components/DashboardInitRedirect";
import Space from "antd/es/space";
import Spin from "antd/es/spin";
import { Suspense } from "react";

export default async function BalancePage() {
  return (
    <Suspense fallback={<Spin fullscreen spinning />}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <DashboardInitRedirect />
        <Balance />
      </Space>
    </Suspense>
  );
}
