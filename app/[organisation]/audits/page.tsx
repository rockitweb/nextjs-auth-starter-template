"use client";

import { Audit, website } from "@/@types/dbTypes";
import { getAudits } from "@/actions/dbActions/auditActions";
import { getWebsites } from "@/actions/dbActions/websiteAction";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { get } from "http";
import React, { use, useEffect, useState } from "react";
import { set } from "react-hook-form";
import Overview from "./overview";

export type DashboardPageProps = { params: { organisation: string } };
export const DashboardPage: React.FC<DashboardPageProps> = ({
  params: { organisation },
}) => {
  const [websites, setWebsites] = useState<website[]>([]);
  const [selectedWebsite, setSelectedWebsite] = useState<string>("");
  const [audits, setAudits] = useState<Audit[]>([]);
  const [selectedAudit, setSelectedAudit] = useState<string>("");
  //get the websites for the organisation using useEffect

  useEffect(() => {
    const fetchWebsites = async () => {
      const websites = await getWebsites(organisation);
      setWebsites(websites);
    };
    fetchWebsites();
  }, [organisation]);

  //to do get the audits for the selected website
  useEffect(() => {
    //get the audits for the selected website
    const fetchAudits = async () => {
      if (selectedWebsite) {
        const audits = await getAudits(selectedWebsite);
        console.log("audits", audits);
        setAudits(audits);
      }
    };
    console.log("selectedWebsite", selectedWebsite);
    fetchAudits();
  }, [selectedWebsite]);

  //load the audit pages for the selected audit
  /*   useEffect(() => {
    //get the audit pages for the selected audit
    const fetchAuditPages = async () => {
      if (selectedAudit) {
        const auditPages = await getAuditPages(selectedAudit);
        console.log("auditPages", auditPages);
        setAuditPages(auditPages);
      }
    };
    fetchAuditPages();
  }, [selectedAudit]); */

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center my-2">
        <div className=" flex gap-3">
          <h1 className=" text-3xl font-bold">Audit Dashboard</h1>
          <Select onValueChange={setSelectedWebsite} value={selectedWebsite}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Website" />
            </SelectTrigger>
            <SelectContent>
              {websites.map((website) => (
                <SelectItem key={website.id} value={website.id}>
                  {website.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className=" flex gap-3">
          <Select onValueChange={setSelectedAudit} value={selectedAudit}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Audit" />
            </SelectTrigger>
            <SelectContent>
              {audits
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
                .map((audit) => (
                  <SelectItem key={audit.id} value={audit.id}>
                    {audit.title} -{" "}
                    {audit.createdAt?.toLocaleString("en-AU", {
                      timeZoneName: "short",
                    }) || ""}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Overview auditId={selectedAudit} />
      </div>
    </div>
  );
};

export default DashboardPage;
