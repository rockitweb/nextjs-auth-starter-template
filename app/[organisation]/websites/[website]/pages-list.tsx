"use client";

import { WebsitePage } from "@/@types/dbTypes";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";

import {
  deleteWebsitePage,
  insertWebsitePage,
} from "@/actions/dbActions/websitePageAction";
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
    insertWebsitePage({
      path: input,
      websiteId: websiteId,
    });
    setInput("");
  };

  const handleDeleteClick = async (id: string) => {
    await deleteWebsitePage(id);
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
          <div key={page.id} className="flex justify-between">
            <div className=" text-lg"> {page.path}</div>
            <div className="flex gap-2">
              <Button
                variant={"destructive"}
                size={"icon"}
                onClick={() => handleDeleteClick(page.id)}
              >
                <Cross2Icon />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default WebsitePages;
