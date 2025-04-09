import { UserRoundCog } from "lucide-react";
import { useCallback } from "react";

import { useAuth, useSignout } from "@/entities/auth";
import { useIsMobile } from "@/shared/hooks/use-is-mobile";
import {
  Avatar as BaseAvatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

export function Avatar() {
  const isMobile = useIsMobile();
  const [user] = useAuth();
  const { signOut } = useSignout();

  const handleSignOut = useCallback(() => signOut(), [signOut]);

  const mainComponent = isMobile ? (
    <UserRoundCog size={24} absoluteStrokeWidth />
  ) : (
    <BaseAvatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
      <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
    </BaseAvatar>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{mainComponent}</DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleSignOut}>Выйти</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
