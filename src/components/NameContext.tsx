import { createContext, useState, useContext } from "react";

interface NameContextType {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

export const NameContext = createContext<NameContextType | null>(null);

export function NameProvider({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState("");
  return (
    <NameContext.Provider value={{ name, setName }}>
      {children}
    </NameContext.Provider>
  );
}

export function useNameContext() {
  const context = useContext(NameContext);
  if (context === null) {
    throw new Error("useNameContext must be used within a NameProvider");
  }
  return context;
}
