import "./globals.css";
import type { Metadata } from "next";
import MainLayout from "@/components/mainLayout";

export const metadata: Metadata = {
  title: "فروشگاه اسپادز",
  description: "",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" dir="rtl">
      <body className="font-vazir">
        {children}12313
        <MainLayout />
      </body>
    </html>
  );
};

export default RootLayout;
