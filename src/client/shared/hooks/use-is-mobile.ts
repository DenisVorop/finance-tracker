import { useDeviceInfoContext } from "../lib/device-info-manager";

export function useIsMobile(): boolean {
  const { phone, tablet } = useDeviceInfoContext();

  return phone || tablet;
}
