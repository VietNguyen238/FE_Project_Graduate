import { createContext, useContext, useState, ReactNode } from "react";

interface NavigateProps {
  navigate: string;
  setNavigate: (index: string) => void;
}

const NavigateContext = createContext<NavigateProps | undefined>(undefined);

export function NavigateProvider({ children }: { children: ReactNode }) {
  const [navigate, setNavigate] = useState("");

  return (
    <NavigateContext.Provider
      value={{
        navigate,
        setNavigate,
      }}
    >
      {children}
    </NavigateContext.Provider>
  );
}

export function useNavigateContext() {
  const context = useContext(NavigateContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
}
