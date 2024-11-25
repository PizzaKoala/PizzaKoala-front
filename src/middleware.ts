import { auth } from "./auth";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware() {
  // const session = await auth();
  // if (!session) {
  if (!cookies) {
    // return NextResponse.redirect("http://localhost:3000/i/flow/login");
    return NextResponse.redirect(`http://localhost:3000?error=unauthorized`);
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/compose/tweet",
    "/home",
    "/explore",
    "/messages",
    "/search",
    "/profile",
  ],
};
