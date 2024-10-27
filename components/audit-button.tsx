"use client";

import { website } from "@/@types/dbTypes";
import React from "react";
import { Button } from "./ui/button";
import { AuditPage } from "@/actions/kayle/audit";
import { url } from "inspector";

export type AuditButtonProps = { website: website };
export const AuditButton: React.FC<AuditButtonProps> = ({ website }) => {
  const onClick = () => {
    console.log("stat audit");
    AuditPage(website.url).then((res) => {
      console.log("res", res);
    });
  };

  return (
    <Button variant="default" onClick={() => onClick()}>
      Run Scan
    </Button>
  );
};

export default AuditButton;
