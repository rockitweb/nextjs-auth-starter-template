import { website } from "@/@types/dbTypes";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import WebsiteCreate from "./website-create";

export type WebsiteListProps = { websites: website[] };
export const WebsiteList: React.FC<WebsiteListProps> = ({ websites }) => {
  //const websites = await getWebsites(organizationId);

  return (
    <div className="grid grid-cols-3 gap-5">
      {websites.map((website: website) => (
        <Card key={website.id}>
          <CardHeader>
            <CardTitle>{website.title}</CardTitle>
            <CardDescription>{website.url}</CardDescription>
          </CardHeader>
          <CardContent>Add some content here</CardContent>
          <CardFooter className=" flex w-full justify-between">
            <Button variant="default">Run Scan</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default WebsiteList;
