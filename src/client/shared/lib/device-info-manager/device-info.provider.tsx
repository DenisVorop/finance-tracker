import debounce from "lodash/debounce";
import React from "react";

import {
  DeviceInfoContext,
  type DeviceInfoContextState,
} from "./device-info.context";

interface DeviceInfoProviderProps {
  children?: React.ReactNode;
}

export function DeviceInfoProvider(props: DeviceInfoProviderProps) {
  const { children } = props;
  const [currentInfo, setCurrentInfo] = React.useState<DeviceInfoContextState>({
    phone: false,
    tablet: false,
  });

  React.useEffect(() => {
    function update() {
      const isDesktop = window.matchMedia(`(min-width: 768px)`).matches;
      const isTablet = window.matchMedia(`(min-width: 425px)`).matches;
      const newInfo: DeviceInfoContextState = {
        phone: !isDesktop && !isTablet,
        tablet: !isDesktop && isTablet,
      };

      if (
        newInfo.tablet !== currentInfo.tablet ||
        newInfo.phone !== currentInfo.phone
      ) {
        setCurrentInfo(newInfo);
      }
    }

    update();
    const debouncedUpdate = debounce(update, 150);

    window.addEventListener("resize", debouncedUpdate);

    return () => {
      window.removeEventListener("resize", debouncedUpdate);
    };
  }, [currentInfo]);

  return (
    <DeviceInfoContext.Provider value={currentInfo}>
      {children}
    </DeviceInfoContext.Provider>
  );
}

export function useDeviceInfoContext(): DeviceInfoContextState {
  return React.useContext(DeviceInfoContext);
}
