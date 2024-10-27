import { UserDetails } from "../components/user-details";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { CodeSwitcher } from "../components/code-switcher";
import { LearnMore } from "../components/learn-more";
import { Footer } from "../components/footer";
import { ClerkLogo } from "../components/clerk-logo";
import { NextLogo } from "../components/next-logo";

import { DASHBOARD_CARDS } from "../consts/cards";
import MainNav from "@/components/navigation/main-nav";
import Header from "@/components/header";

export default async function DashboardPage() {
  return (
    <>
      <main className="max-w-[75rem] w-full mx-auto">
        <Header />

        <div className="pt-[3.5rem]"></div>
      </main>

      <Footer />
    </>
  );
}
