import { ThemeSwitcher } from "@/components/theme-switcher";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { hasEnvVars } from "@/lib/utils";
import { Suspense } from "react";

export default function navbar() {
  if (!hasEnvVars) {
    throw new Error("Supabase env vars missing");
  }

  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-5xl flex justify-end items-center p-3 px-5 text-sm">
        <ThemeSwitcher />
      </div>
    </nav>
  );
}
