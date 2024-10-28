"use server";

import { Audit } from "@/@types/kayleTypes";

export async function AuditPage(url: string) {
  //fetch the websites for the organisation
  console.log("url", process.env.SERVER_URL);
  const results = await fetch(`${process.env.SERVER_URL}/audit`, {
    method: "POST",
    body: JSON.stringify({ url }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data: Audit = await results.json();

  return data;
}
