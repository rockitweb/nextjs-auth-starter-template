"use client";
import {
  OrganizationSwitcher,
  useOrganization,
  UserButton,
} from "@clerk/nextjs";
import React, { useEffect } from "react";
import MainNav from "./navigation/main-nav";
import { usePathname, useParams, useRouter } from "next/navigation";
import path from "path";

export type HeaderProps = {};
export const Header: React.FC<HeaderProps> = ({}) => {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const { organization } = useOrganization();

  //track changes to the organization object and route the user to the correct path
  useEffect(() => {
    const currentOrg: string = params.organisation as string;

    const newPath = pathname.replace(currentOrg, organization?.id || "admin");

    router.push(newPath);
  }, [organization]);

  return (
    <header className="flex items-center justify-between w-full h-16 border-b-2 ">
      <OrganizationSwitcher
        appearance={{
          elements: {
            organizationPreviewAvatarBox: "size-6",
          },
        }}
      />
      <MainNav />
      <UserButton
        afterSignOutUrl="/"
        appearance={{
          elements: {
            userButtonAvatarBox: "size-6",
          },
        }}
      />
    </header>
  );
};

export default Header;
