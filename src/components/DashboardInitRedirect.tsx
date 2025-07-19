"use client";

import { BALANCE_ROUTE, COMMON_SHEET } from "@/utils/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function DashboardInitRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams.get("sheet")) {
      router.replace(`${BALANCE_ROUTE}?sheet=${COMMON_SHEET}`);
    }
  }, [searchParams, router]);

  return null;
}
