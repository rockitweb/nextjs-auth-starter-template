"use client";

import { enrichAudit } from "@/actions/auditActions/enrichAudit";
import { Button } from "@/components/ui/button";
import React from "react";

export type OverviewProps = { auditId: string };
export const Overview: React.FC<OverviewProps> = ({ auditId }) => {
  return (
    <div>
      Overview{" "}
      <Button onClick={() => enrichAudit(auditId)}>Enrich Audit</Button>
    </div>
  );
};

export default Overview;
