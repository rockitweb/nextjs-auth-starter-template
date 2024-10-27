import { getWebsites } from "@/actions/dbActions/websiteAction";

import React from "react";
import WebsiteCreate from "./website-create";
import WebsiteList from "./website-list";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AuditPage } from "@/actions/kayle/audit";
import AuditButton from "@/components/audit-button";

export type WebsitesPageProps = { params: any };
export const WebsitesPage: React.FC<WebsitesPageProps> = async ({ params }) => {
  //lets make sure this page is only accessible to authenticated users
  //if not authenticated, redirect to the login page

  //get the organisation from the route
  const { organisation } = params;

  //fetch the websites for the organisation
  const websites = await getWebsites(organisation);

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-center my-8">Websites</h1>
        <WebsiteCreate />
      </div>

      <div className="grid grid-cols-3 gap-5">
        {websites.map((website) => (
          <Card key={website.id}>
            <CardHeader>
              <CardTitle>
                <Link href={`/${organisation}/websites/${website.id}`}>
                  {website.title}
                </Link>
              </CardTitle>
              <CardDescription>{website.url}</CardDescription>
            </CardHeader>
            <CardContent>Add some content here</CardContent>
            <CardFooter className=" flex w-full justify-between">
              <AuditButton website={website} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default WebsitesPage;
