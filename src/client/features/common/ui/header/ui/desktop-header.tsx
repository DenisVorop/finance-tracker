import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/shared/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { useAuth } from "@/entities/auth";
import { cn } from "@/shared/lib/utils";

import { config } from "../lib/config";

export function DesktopHeader() {
  const [user] = useAuth();
  const pathname = usePathname();

  return (
    <header className="sticky p-4 shadow-sm top-0 backdrop-blur-sm border-b">
      <div className="container flex items-center justify-between">
        <div className="text-xl font-bold">Логотип</div>

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

          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="User Avatar"
            />
            <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
          </Avatar>
        </nav>
      </div>
    </header>
  );
}
