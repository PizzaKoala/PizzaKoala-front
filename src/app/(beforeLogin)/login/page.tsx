"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import Main from "@/app/(beforeLogin)/_component/Main";

export default function Login() {
  const router: AppRouterInstance = useRouter();
  router.replace("/i/flow/login");
  return <Main></Main>;
}
