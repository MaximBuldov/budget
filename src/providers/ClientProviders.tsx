"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import message from "antd/es/message";
import { useMemo } from "react";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [messageApi, contextHolder] = message.useMessage();

  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          mutations: {
            onError: (err: Error) => {
              messageApi.error(err.message || "Something went wrong");
            },
          },
        },
      }),
    [messageApi]
  );
  return (
    <QueryClientProvider client={queryClient}>
      {contextHolder}
      {children}
    </QueryClientProvider>
  );
}
