"use client";

import { website } from "@/@types/dbTypes";
import { onSubmitAction } from "@/actions/formActions/auditFormSubmit";
import { auditFormSchema } from "@/actions/formActions/schemas";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function ScanForm(props: { websites: website[] }) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof auditFormSchema>>({
    resolver: zodResolver(auditFormSchema),
    defaultValues: {
      websiteId: "",
    },
  });
  function onSubmit(data: z.infer<typeof auditFormSchema>) {
    console.log("Form data in client", data);
  }

  //form stuff
  const [state, formAction] = useFormState(onSubmitAction, {
    message: "",
  });
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <Form {...form}>
      <form
        ref={formRef}
        action={formAction}
        className="space-y-8"
        //onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="websiteId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <Select onValueChange={field.onChange} {...field}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a website to scan" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {props.websites?.map((website) => (
                    <SelectItem key={website.id} value={website.id}>
                      {`${website.title} - ${website.url}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
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
        <Button type="submit">Scan</Button>
      </form>
    </Form>
  );
}
