"use client";

import { SignOutButton } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";

const SignOut = () => {
  const { toast } = useToast();

  const handlerSignOut = () => {
    toast({ description: "Sign out Successfully!" });
  };

  return (
    <SignOutButton redirectUrl="/">
      <button onClick={handlerSignOut}>Logout</button>
    </SignOutButton>
  );
};
export default SignOut;
