import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="login">
      <div className="container mx-auto grid h-full w-full grid-cols-1 items-center md:grid-cols-2">
        {children}
      </div>
    </div>
  );
};

export default Layout;
