import { INITIAL_UI_STATE, UIState } from "@/models/ui";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface UIContextProps {
  uiState: UIState;
  setUIState: Dispatch<SetStateAction<UIState>>;
  handleToggleState: (key: keyof UIState) => void;
}

const UIContext = createContext<UIContextProps | undefined>(undefined);

//@todo: use reduceer/dispatch
export const UIProvider = ({ children }: PropsWithChildren) => {
  const [uiState, setUIState] = useState<UIState>(INITIAL_UI_STATE);
  const handleToggleState = (key: keyof UIState) => {
    setUIState((prev) => ({ ...INITIAL_UI_STATE, [key]: !prev[key] }));
  };

  return (
    <UIContext.Provider value={{ uiState, setUIState, handleToggleState }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUIContext = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUIContext must be used within a UIProvider");
  }
  return context;
};
