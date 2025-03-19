import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/shared/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { useAuth } from "@/entities/auth";

import { config } from "../lib/config";

export function DesktopHeader() {
  const [user] = useAuth();
  const pathname = usePathname();

  return (
    <header className="sticky flex items-center justify-between p-4 shadow-sm top-0 backdrop-blur-sm border-b">
      <div className="text-xl font-bold">Логотип</div>

      <nav className="flex items-center gap-4">
        {config.map(({ Icon, label, link }) => (
          <Link href={link} key={label}>
            <Button variant="ghost" className="flex items-center gap-2">
              <Icon size={18} /> {label}
            </Button>
          </Link>
        ))}

        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
          <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
        </Avatar>
      </nav>
    </header>
  );
}
