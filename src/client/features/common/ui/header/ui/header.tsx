import { useIsMobile } from "@/shared/hooks/use-is-mobile";

import { DesktopHeader } from "./desktop-header";
import { MobileHeader } from "./mobile-header";

export function Header() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileHeader />;
  }

  return <DesktopHeader />;
}
