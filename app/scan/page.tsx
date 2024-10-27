import Header from "@/components/header";
import React from "react";
import { Footer } from "../components/footer";

export type ScanPageProps = {};
export const ScanPage: React.FC<ScanPageProps> = ({}) => {
  return (
    <>
      <main className="max-w-[75rem] w-full mx-auto">
        <Header />

        <div className="pt-[3.5rem]"></div>
      </main>

      <Footer />
    </>
  );
};

export default ScanPage;
