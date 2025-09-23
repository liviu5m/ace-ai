import React from "react";
import type { ReactNode } from "react";
import { AppProvider } from "../../lib/AppContext";
import Header from "../elements/Header";

type LayoutProps = {
  children: ReactNode;
};

const BodyLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AppProvider>
      <div className="flex justify-center items-center flex-col text-[#121212] bg-white">
        <Header />
        <div className="h-24"></div>
        {children}
      </div>
    </AppProvider>
  );
};

export default BodyLayout;
