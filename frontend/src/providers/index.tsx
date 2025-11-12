"use client";

import {
  FIVE_MINUTES_IN_MS,
  TEN_MINUTES_IN_MS,
  TOAST_CONFIG,
} from "@/config/constants";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: FIVE_MINUTES_IN_MS,
            gcTime: TEN_MINUTES_IN_MS,
            refetchOnWindowFocus: true,
            refetchOnReconnect: true,
            retry: 2,
          },
          mutations: {
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster position="top-right" toastOptions={TOAST_CONFIG} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
