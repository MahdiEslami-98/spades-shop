import { QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";
import type { Metadata } from "next";
import queryClient from "@/libs/raectQuery";

export const metadata: Metadata = {
  title: "فروشگاه اسپادز",
  description: "فروشگاه اینترنتی ساعت",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" dir="rtl" className="h-full">
      <body className="h-full font-vazir">
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
