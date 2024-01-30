import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import MainPanel from "./MainPanel";
import { authOptions } from "@/config/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions)
  if (session) redirect('/dashboard')

  return <MainPanel />
}
