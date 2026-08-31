import Link from "next/link";
import { LogOut } from "lucide-react";

export type SidebarNavItem = {
  href: string;
  isActive?: boolean;
  label: string;
};

type SidebarNavProps = {
  items: SidebarNavItem[];
};

export function SidebarNav({ items }: SidebarNavProps) {
  return (
    <nav aria-label="Dashboard navigation" className="flex flex-1 flex-col">
      <div className="space-y-1 px-4 py-4">
        {items.map((item) => {
          return (
            <Link
              aria-current={item.isActive ? "page" : undefined}
              className={`flex min-h-11 items-center rounded-sm px-3 py-2 text-sm font-semibold transition ${
                item.isActive
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/70 hover:bg-surface-app hover:text-primary"
              }`}
              href={item.href}
              key={item.href}
            >
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="mt-auto p-4">
        <button
          className="flex min-h-11 w-full items-center gap-3 rounded-sm px-3 py-2 text-sm font-semibold text-foreground/70 transition hover:bg-surface-app hover:text-primary"
          type="button"
        >
          <LogOut aria-hidden="true" className="size-5 shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}
