import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import MainPanel from "./MainPanel";
import Background from "./Background";
import { authOptions } from "@/config/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions)
  if (session) redirect('/dashboard')

  return (
    <main>
      <Background />
      <MainPanel />
    </main>
  )
}
