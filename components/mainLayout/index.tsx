import React, { ReactNode } from "react";
import Header from "./header";
import Footer from "./footer";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-full flex-col">
      <Header></Header>
      <div className="flex-1">{children}</div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
