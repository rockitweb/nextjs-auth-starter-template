import React from "react";
import { ScanForm } from "./scan-form";
import { get } from "http";
import { getWebsites } from "@/actions/dbActions/websiteAction";

export type ScanPageProps = { params: any };
export const ScanPage: React.FC<ScanPageProps> = async ({ params }) => {
  const { organisation } = params;

  const websites = await getWebsites(organisation);
  return (
    <div>
      <ScanForm websites={websites} />
    </div>
  );
};

export default ScanPage;
