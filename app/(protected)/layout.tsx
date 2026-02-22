import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Sidebar from "@/components/protected/sidebar";

import { hasEnvVars } from "@/lib/utils";
import { Suspense } from "react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="relative flex-1 w-full flex flex-col items-center">
        <nav className="sticky top-0 left-0 w-full h-16 flex justify-center border-b border-b-foreground/10 px-2 bg-background z-20">
          <div className="w-full flex justify-between items-center text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <ThemeSwitcher />
            </div>
            {!hasEnvVars ? (
              <EnvVarWarning />
            ) : (
              <Suspense>
                <AuthButton />
              </Suspense>
            )}
          </div>
        </nav>
        <div className="relative flex-1 flex gap-10 w-full">
          <Sidebar />
          <div className="flex-1 py-5 px-36 bg-blue-500">{children}</div>
        </div>

        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-4">
          <p>
            Powered by{" "}
            <a
              href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              Supabase
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
