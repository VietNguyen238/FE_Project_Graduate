import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface TitleContextType {
  title: string;
  setTitle: (value: string) => void;
}

const TitleContext = createContext<TitleContextType | undefined>(undefined);

export function TitleProvider({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    document.title = title || "Home";
  }, [title]);

  return (
    <TitleContext.Provider
      value={{
        title,
        setTitle,
      }}
    >
      {children}
    </TitleContext.Provider>
  );
}

export function useTitleContext() {
  const context = useContext(TitleContext);
  if (context === undefined) {
    throw new Error("useTitle must be used within a TitleProvider");
  }
  return context;
}
