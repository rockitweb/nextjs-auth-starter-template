"use client";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import React, { useEffect, useRef } from "react";
import { useOrganization, useSession, useUser } from "@clerk/nextjs";

import { zodResolver } from "@hookform/resolvers/zod";
import { set, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { website } from "@/@types/dbTypes";
import { useFormState, useFormStatus } from "react-dom";
import { onSubmitAction } from "@/actions/formActions/websiteFormSubmit";
import { WebsiteFormSchema } from "@/actions/formActions/schemas";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export type WebsiteCreateProps = { website?: website };

export const WebsiteCreate: React.FC<WebsiteCreateProps> = ({ website }) => {
  const { user } = useUser();
  const { session } = useSession();
  const { organization } = useOrganization();

  const [open, setOpen] = React.useState(false);

  const router = useRouter();

  //form stuff
  const [state, formAction] = useFormState(onSubmitAction, {
    message: "",
  });

  //monitor the form state and then refresh the route
  useEffect(() => {
    if (state.message) {
      console.log("Form message", state.message);

      router.refresh();
      setOpen(false);
    }
  }, [state]);

  const form = useForm<z.infer<typeof WebsiteFormSchema>>({
    resolver: zodResolver(WebsiteFormSchema),
    defaultValues: website,
  });

  const formRef = useRef<HTMLFormElement>(null);

  const { fields, append } = useFieldArray({
    name: "pages",
    control: form.control,
  });

  if (!user || !session || !organization) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">{website ? "Edit" : "Add Website"}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {website ? "Update Website" : "Add New"} Website
          </DialogTitle>
          <DialogDescription>Add a new website for auditing</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form ref={formRef} className="w-2/3 space-y-6" action={formAction}>
            <FormField
              control={form.control}
              name="id"
              defaultValue={website?.id}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} hidden />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="organisationId"
              defaultValue={website?.organisationId || organization?.id}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} hidden />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              defaultValue={website?.title}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name used in audit reports etc
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              defaultValue={website?.url}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Url</FormLabel>
                  <FormControl>
                    <Input placeholder="https://" {...field} />
                  </FormControl>
                  <FormDescription>Website URL</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*     <div>
              <h3>Pages</h3>
              {fields.map((field, index) => (
                <div className="flex gap-3">
                  <FormField
                    control={form.control}
                    key={field.id}
                    name={`pages.${index}.id`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    key={field.id}
                    name={`pages.${index}.websiteID`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    key={field.id}
                    name={`pages.${index}.path`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => append({ id: "", websiteID: "", path: "" })}
              >
                Add Page
              </Button>
            </div> */}
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default WebsiteCreate;
