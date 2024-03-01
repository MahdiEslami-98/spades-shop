import "./globals.css";
import type { Metadata } from "next";
import MainLayout from "@/components/mainLayout";

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
    <html lang="en" dir="rtl">
      <body className="font-vazir">
        <MainLayout />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
