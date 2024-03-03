import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import QueryProvider from "@/lib/raectQuery";

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
        <QueryProvider>
          <main className="h-full">{children}</main>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
