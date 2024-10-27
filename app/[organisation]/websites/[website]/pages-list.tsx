"use client";

import { WebsitePage } from "@/@types/dbTypes";
import { upsertWebsitePage } from "@/actions/dbActions/websitePageAction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";

export type WebsitePagesProps = { websiteId: string; pages: WebsitePage[] };
export const WebsitePages: React.FC<WebsitePagesProps> = ({
  websiteId,
  pages,
}) => {
  // State for handling input value
  const [input, setInput] = useState("");

  // Event handler for input change
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  // Event handler for adding a new todo
  const handleAdd = async () => {
    upsertWebsitePage({ websiteId, path: input });
    setInput("");
  };
  return (
    <>
      <div className="flex gap-2">
        <Input
          placeholder="Add a new page"
          onChange={handleInput}
          value={input}
        />
        <Button variant="default" onClick={handleAdd}>
          Add
        </Button>
      </div>
      <div className="flex flex-col gap-5">
        {pages.map((page) => (
          <div key={page.id}>{page.path}</div>
        ))}
      </div>
    </>
  );
};

export default WebsitePages;
