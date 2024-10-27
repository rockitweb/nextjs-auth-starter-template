import {
  SignedIn,
  SignedOut,
  SignInButton,
  useOrganization,
} from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

export type loginButtonProps = {};
export const LoginButton: React.FC<loginButtonProps> = ({}) => {
  //get the current organisation (if they are logged in)
  const { organization } = useOrganization();

  return (
    <div className="relative flex gap-3">
      <SignedIn>
        <Link
          href={`/${organization?.id}/dashboard`}
          className="px-4 py-2 rounded-full bg-black text-white text-sm font-semibold"
        >
          Dashboard
        </Link>
      </SignedIn>
      <SignedOut>
        <SignInButton>
          <button className="box-border relative grow shrink-0 p-6 mt-5 ml-auto w-full text-center rounded border-2 border-black border-solid appearance-none cursor-pointer bg-[black]  text-[white] max-sm:py-4 max-sm:max-w-full">
            Sign in
          </button>
        </SignInButton>
      </SignedOut>
    </div>
  );
};

export default LoginButton;
