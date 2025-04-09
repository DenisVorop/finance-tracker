import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/shared/lib/utils";

import { config } from "../lib/config";

import { Avatar } from "./avatar";

export function MobileHeader() {
  const pathname = usePathname();

  return (
    <header className="fixed z-[2] left-0 right-0 bottom-0 flex items-center px-6 py-4 shadow-sm justify-center bg-gradient-to-bl from-black via-stone-900 to-black border-t border-t-neutral-900">
      <nav className="flex items-center justify-between gap-4 flex-auto">
        {config.map(({ Icon, label, link }) => (
          <Link href={link} key={label}>
            <div
              className={cn(
                "p-2 hover:text-accent-foreground hover:bg-accent transition-colors rounded-md flex justify-center",
                {
                  "pointer-events-none bg-zinc-800 border-2 border-accent":
                    pathname === link,
                }
              )}
            >
              <Icon size={24} absoluteStrokeWidth />
            </div>
          </Link>
        ))}

        <div className="p-2 hover:text-accent-foreground hover:bg-accent transition-colors rounded-md">
          <Avatar />
        </div>
      </nav>
    </header>
  );
}
