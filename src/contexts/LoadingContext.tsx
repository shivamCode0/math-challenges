import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";

type LoadingContextType = {
  isLoading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  toggleLoading: () => void;
};

const LoadingContext = React.createContext<LoadingContextType>(null);

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  const state: LoadingContextType = {
    isLoading,
    setLoading: setIsLoading,
    toggleLoading: () => setIsLoading((pv) => !pv),
  };

  return (
    <LoadingContext.Provider value={state}>
      {children}
      <Modal show={isLoading}>
        <Modal.Body>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </Modal.Body>
      </Modal>
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(LoadingContext);
}
