import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

import { config } from "../lib/config";
import logo from "../assets/finance-tracker-logo.png";

import { Avatar } from "./avatar";

export function DesktopHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky p-4 shadow-sm top-0 backdrop-blur-sm border-b">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={logo.src} width={36} height={36} className="rounded-xl" />
          <div className="text-xl font-bold">Finance +</div>
        </div>

        <nav className="flex items-center gap-4">
          {config.map(({ Icon, label, link }) => (
            <Link href={link} key={label}>
              <Button
                variant="ghost"
                className={cn("flex items-center gap-2", {
                  "pointer-events-none bg-stone-800": pathname === link,
                })}
              >
                <Icon size={18} /> {label}
              </Button>
            </Link>
          ))}

          <Avatar />
        </nav>
      </div>
    </header>
  );
}
