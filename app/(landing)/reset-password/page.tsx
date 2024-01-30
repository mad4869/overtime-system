import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { type Metadata } from "next";

import MainPanel from "./MainPanel";
import ResetNotice from "./ResetNotice";
import { authOptions } from "@/config/authOptions";
import { type PageProps } from "@/types/customs";

export const metadata: Metadata = {
  title: 'Reset Password'
}

export default async function ResetPassword({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions)
  if (session) redirect('/dashboard')

  if (!searchParams.token) return <MainPanel />

  const token = typeof searchParams.token === 'string' ? searchParams.token : undefined

  return <ResetNotice token={token} />
}
