"use client";

import {
  THIRTY_SECONDS_IN_MS,
  THREE_MINUTES_IN_MS,
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
            staleTime: THIRTY_SECONDS_IN_MS,
            gcTime: THREE_MINUTES_IN_MS,
            refetchOnReconnect: true,
            refetchInterval: THIRTY_SECONDS_IN_MS,
            refetchIntervalInBackground: true,
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
