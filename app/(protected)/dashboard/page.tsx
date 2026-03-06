import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { FetchDataSteps } from "@/components/tutorial/fetch-data-steps";
import { Suspense } from "react";

import Header from "@/components/protected/dashboard/header";
import Projects from "@/components/protected/dashboard/projects";

async function UserDetails() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/login");
  }

  return JSON.stringify(data.claims, null, 2);
}

export default function Dashboard() {
  // CHECK IF THE ITS USER OR ADMIN
  return (
    <div className="flex-1 w-full h-full flex flex-col p-4 border border-black">
      <Header />
      <Projects />
      <div className="flex flex-col">
        <p>UPDATE DATA INPUT</p>
        <p>CREATE A SETTINGS TO UPDATE user_profiles table</p>
        <p>CHANGE DASHBOARD</p>
      </div>
    </div>
  );
}
