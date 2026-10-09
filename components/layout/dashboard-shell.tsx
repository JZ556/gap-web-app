import type { ReactNode } from "react";
import Image from "next/image";
import gapLogo from "@/public/images/gap sign.jpeg";
import { SidebarNav, type SidebarNavItem } from "@/components/layout/sidebar-nav";

type DashboardShellProps = {
  brandSubtitle: string;
  brandTitle: string;
  children: ReactNode;
  navItems: SidebarNavItem[];
};

export function DashboardShell({
  brandSubtitle,
  brandTitle,
  children,
  navItems,
}: DashboardShellProps) {
  return (
    <main className="min-h-screen bg-surface-app text-foreground">
      <div className="grid min-h-screen bg-white md:grid-cols-[240px_1fr]">
        <aside className="flex border-b border-border bg-white md:border-b-0 md:border-r">
          <div className="flex min-h-full w-full flex-col">
            <div className="flex flex-col items-center gap-3 px-4 py-6 text-center">
              <Image
                alt="Greyhounds As Pets"
                className="h-auto w-32 md:w-44"
                src={gapLogo}
              />
              <div className="min-w-0">
                <p className="text-base font-extrabold leading-tight text-primary">
                  {brandTitle}
                </p>
                <p className="mt-1 text-sm leading-5 text-foreground/65">
                  {brandSubtitle}
                </p>
              </div>
            </div>

            <SidebarNav items={navItems} />
          </div>
        </aside>

        <section className="min-w-0 bg-surface-app">
          <div className="p-6 sm:p-8">{children}</div>
        </section>
      </div>
    </main>
  );
}
