import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { PawPrint } from "lucide-react";
import { SidebarNav, type SidebarNavItem } from "@/components/layout/sidebar-nav";

type DashboardShellProps = {
  brandIcon?: LucideIcon;
  brandSubtitle: string;
  brandTitle: string;
  children: ReactNode;
  navItems: SidebarNavItem[];
  userInitials?: string;
};

export function DashboardShell({
  brandIcon: BrandIcon = PawPrint,
  brandSubtitle,
  brandTitle,
  children,
  navItems,
  userInitials,
}: DashboardShellProps) {
  return (
    <main className="min-h-screen bg-surface-app text-foreground">
      <div className="grid min-h-screen bg-white md:grid-cols-[240px_1fr]">
        <aside className="flex border-b border-border bg-white md:border-b-0 md:border-r">
          <div className="flex min-h-full w-full flex-col">
            <div className="flex items-center gap-3 px-5 py-7">
              <div className="grid size-10 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
                <BrandIcon aria-hidden="true" className="size-6" strokeWidth={2.5} />
              </div>
              <div className="min-w-0">
                <p className="text-lg font-extrabold leading-tight tracking-tight text-primary">
                  {brandTitle}
                </p>
                <p className="mt-1 text-xs leading-4 text-foreground/65">
                  {brandSubtitle}
                </p>
              </div>
            </div>

            <SidebarNav items={navItems} />
          </div>
        </aside>

        <section className="min-w-0 bg-surface-app">
          <header className="flex min-h-16 items-center justify-between border-b border-border bg-white px-6">
            <h1 className="text-xl font-extrabold tracking-tight text-primary">
              Greyhound Racing NSW
            </h1>
            {userInitials ? (
              <div className="grid size-9 place-items-center rounded-full bg-primary/10 text-xs font-extrabold text-primary">
                {userInitials}
              </div>
            ) : null}
          </header>

          <div className="p-6 sm:p-8">{children}</div>
        </section>
      </div>
    </main>
  );
}
