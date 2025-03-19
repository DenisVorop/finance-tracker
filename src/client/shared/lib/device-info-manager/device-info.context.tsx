import React from "react";

export interface DeviceInfoContextState {
  tablet: boolean;
  phone: boolean;
}

export const DeviceInfoContext: React.Context<DeviceInfoContextState> =
  React.createContext<DeviceInfoContextState>({
    tablet: false,
    phone: false,
  });
