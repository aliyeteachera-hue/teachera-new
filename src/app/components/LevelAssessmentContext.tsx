import { createContext, useContext, useState, type ReactNode } from 'react';

interface LevelAssessmentContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const LevelAssessmentContext = createContext<LevelAssessmentContextType>({
  isOpen: false,
  open: () => {},
  close: () => {},
});

export function LevelAssessmentProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <LevelAssessmentContext.Provider
      value={{
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </LevelAssessmentContext.Provider>
  );
}

export function useLevelAssessment() {
  return useContext(LevelAssessmentContext);
}
