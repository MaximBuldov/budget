"use client";

import { BALANCE_ROUTE } from "@/utils/constants";
import Spin from "antd/es/spin";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFoundPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(BALANCE_ROUTE);
  }, [router]);

  return <Spin spinning fullscreen />;
}
