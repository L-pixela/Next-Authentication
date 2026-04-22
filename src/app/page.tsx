"use server";

import { auth } from "@/src/auth";
import { SignInButton } from "./components/sigin-in-button";
import Link from "next/link";
import { SignOutButton } from "./components/sign-out-button";

export default async function Home() {
  const session = await auth();
  
  if (session?.user){
    return (
      <div>
        <Link href="/user-info">User Info</Link>
        <SignOutButton/>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center p-4 justify-center h-full gap-4">
      {" "}
      <h1>Welcome to the Authentication App</h1>
      <p>Please log in to access your dashboard.</p>
      <SignInButton />
    </div>
  );
}
