/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect, useContext } from "react";
import { useLocalStorage } from "util/useLocalStorage";

type DarkModeContextType = {
  darkModeEnabled: boolean;
  toggleDarkMode: () => void;
  enableDarkMode: () => void;
  disableDarkMode: () => void;
  setDarkModeEnabled: (enabled: boolean) => void;
};

const DarkModeContext = React.createContext<DarkModeContextType>(null);

export function ProvideDarkMode({ children }) {
  const { d: darkmode, s } = useProvideDarkMode();
  return (
    <DarkModeContext.Provider value={darkmode}>
      {s}
      {children}
    </DarkModeContext.Provider>
  );
}

export const useDarkMode = () => {
  return useContext(DarkModeContext);
};

function useProvideDarkMode(): { d: DarkModeContextType; s: any } {
  const [dm, setDm] = useLocalStorage("mathc_darkmode", false);

  const [DR, setDR] = useState<string>(null);

  const DRimp = async () => {
    const darkcss = await import("scss/darkreader-export-minified", {}).then(({ default: v }) => {
      console.log("Imported DarkReader");
      return v;
    });
    setDR(darkcss);
    return darkcss;
  };
  useEffect(() => {
    if (dm) if (dm && !DR) DRimp();

    window["dm"] = temp;
  }, [dm, DR]);

  const temp: DarkModeContextType = {
    darkModeEnabled: dm,
    toggleDarkMode: () => setDm((pv) => !pv),
    enableDarkMode: () => setDm(true),
    disableDarkMode: () => setDm(false),
    setDarkModeEnabled: (enabled) => setDm(enabled),
  };

  return {
    d: temp,
    s: (
      <>
        {dm && DR && (
          <style jsx global>
            {DR}
          </style>
        )}
        {dm && !DR && (
          <style jsx global>
            {`
              * {
                background-color: #181a1b !important;
              }
            `}
          </style>
        )}
      </>
    ),
  };
}
