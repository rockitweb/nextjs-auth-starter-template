import Header from "@/components/header";
import React, { PropsWithChildren, useState } from "react";
import { Footer } from "../components/footer";

export type LayoutProps = PropsWithChildren;
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <main className="max-w-[75rem] w-full mx-auto">
        <Header />
        {children}
      </main>

      <Footer />
    </>
  );
};

export default Layout;
