"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useOrganization } from "@clerk/nextjs";
import {
  NavigationMenuContent,
  NavigationMenuTrigger,
} from "@radix-ui/react-navigation-menu";
import Link from "next/link";

const menuItems = [
  { label: "Audits", href: "/audits" },
  { label: "Websites", href: "/websites" },
  { label: "Scan", href: "/scan" },
];

export type MainNavProps = {};
export const MainNav: React.FC<MainNavProps> = ({}) => {
  const { organization } = useOrganization();
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {menuItems.map((item) => (
          <NavigationMenuItem key={item.href}>
            <Link
              href={`/${organization?.id || "admin"}${item.href}`}
              legacyBehavior
              passHref
            >
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {item.label}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainNav;
