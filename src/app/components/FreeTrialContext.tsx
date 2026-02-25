import { createContext, useContext, useState, type ReactNode } from 'react';

interface FreeTrialContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const FreeTrialContext = createContext<FreeTrialContextType>({
  isOpen: false,
  open: () => {},
  close: () => {},
});

export function FreeTrialProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FreeTrialContext.Provider
      value={{
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </FreeTrialContext.Provider>
  );
}

export function useFreeTrial() {
  return useContext(FreeTrialContext);
}
