"use server";

import { revalidatePath } from "next/cache";
import { addWebsite, editWebsite } from "../dbActions/websiteAction";
import { WebsiteFormSchema } from "./schemas";
import path from "path";
import {
  WebsiteEdit,
  WebsiteInsert,
  WebsitePage,
  WebsitePageEdit,
} from "@/@types/dbTypes";

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
};

export async function onSubmitAction(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  console.log("Form data", data);
  const formData = Object.fromEntries(data);
  console.log("Parsed data", formData);
  const parsed = WebsiteFormSchema.safeParse(formData);
  console.log("Parsed data", parsed);
  if (!parsed.success) {
    return {
      message: "Invalid form data",

      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }

  //we need to construct an array of pages based off the form data name pages.0.value

  const outputArray = Object.entries(formData)
    .reduce((result: Record<string, any>[], [key, value]) => {
      const match = key.match(/^pages\.(\d+)\.(\w+)$/);

      if (match) {
        const [_, index, field] = match;

        if (!result[Number(index)]) result[Number(index)] = {};

        result[Number(index)][field] = value;
      }

      return result;
    }, [])
    .map((item) => item || {});

  console.log("Output array", outputArray);

  //convert out output array to an array of objects of type WebsitePage
  const websitePages: WebsitePageEdit[] = outputArray.map((page) => {
    return {
      id: page.id,
      websiteId: page.websiteID,
      path: page.path,
    };
  });

  if (parsed.data.id) {
    const updateData: WebsiteEdit = {
      ...parsed.data,
    };

    editWebsite(parsed.data.id, updateData);
  } else {
    delete parsed.data.id;
    const newWebsite: WebsiteInsert = parsed.data;

    addWebsite(newWebsite);
    revalidatePath("/[organisation]/websites", "page");
  }

  return { message: "User registered" };
}
