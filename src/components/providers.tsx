"use client";

import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/components/auth-provider";
import { CheckoutCartProvider } from "@/components/checkout-cart-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AuthProvider>
        <CheckoutCartProvider>{children}</CheckoutCartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
