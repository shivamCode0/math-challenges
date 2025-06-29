import React, { useContext, useState } from "react";

type PrintModeContextType = {
  printMode: boolean;
  setPrintMode: React.Dispatch<React.SetStateAction<boolean>>;
  togglePrintMode: () => void;
};

const PrintModeContext = React.createContext<PrintModeContextType>(null);

export function PrintModeProvider({ children }) {
  const [printMode, setPrintMode] = useState(false);

  const state: PrintModeContextType = {
    printMode,
    setPrintMode,
    togglePrintMode: () => setPrintMode((pv) => !pv),
  };

  return <PrintModeContext.Provider value={state}>{children}</PrintModeContext.Provider>;
}

export function usePrintMode() {
  return useContext(PrintModeContext);
}
