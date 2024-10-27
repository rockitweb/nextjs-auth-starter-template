import { getWebsite } from "@/actions/dbActions/websiteAction";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import WebsiteCreate from "../website-create";
import { getWebsitesPages } from "@/actions/dbActions/websitePageAction";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import WebsitePages from "./pages-list";

export type WebsitePageProps = { params: any };
export const WebsitePage: React.FC<WebsitePageProps> = async ({ params }) => {
  //get the website
  const { website } = params;

  const [websiteResponse, websitePagesResponse] = await Promise.all([
    getWebsite(website),
    getWebsitesPages(website),
  ]);

  if (!websiteResponse || websiteResponse.length === 0) return null;

  const websiteData = websiteResponse[0];

  return (
    <div className="flex flex-col gap-5 mt-10">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            <div>{websiteData.title}</div>
            <WebsiteCreate website={websiteData} />
          </CardTitle>
          <CardDescription>{websiteData.url}</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-2">
          <div>Pages</div>
          <WebsitePages
            websiteId={websiteData.id}
            pages={websitePagesResponse}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default WebsitePage;
