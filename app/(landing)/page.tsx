import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import MainPanel from "./MainPanel";
import { authOptions } from "@/config/authOptions";
import { type PageProps } from "@/types/customs";

export default async function Home({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions)
  if (session) redirect('/dashboard')

  const additionalRegister = Boolean(searchParams['additional-register'])

  return <MainPanel additionalRegister={additionalRegister} />
}
