import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';

interface AiModeContextType {
  isAiMode: boolean;
  setIsAiMode: Dispatch<SetStateAction<boolean>>;
}

const AiModeContext = createContext<AiModeContextType | undefined>(undefined);

export const AiModeProvider = ({ children }: { children: ReactNode }) => {
  const [isAiMode, setIsAiMode] = useState(false);

  const value = useMemo(() => ({ isAiMode, setIsAiMode }), [isAiMode]);

  return (
    <AiModeContext.Provider value={value}>{children}</AiModeContext.Provider>
  );
};

export const useAiMode = () => {
  const context = useContext(AiModeContext);
  if (context === undefined) {
    throw new Error('useAiMode must be used within an AiModeProvider');
  }
  return context;
};
