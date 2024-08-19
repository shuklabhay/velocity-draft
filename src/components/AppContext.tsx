import { createContext, useState, useContext, useEffect } from "react";
import { TableItem, WriterInfo } from "../utils/types";
import { emptyRow } from "../utils/table";
import dayjs from "dayjs";

interface AppContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  writerInfo: WriterInfo;
  setWriterInfo: React.Dispatch<React.SetStateAction<WriterInfo>>;
  tableData: TableItem[];
  setTableData: React.Dispatch<React.SetStateAction<TableItem[]>>;
}

const saveToLocalStorage = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

const loadFromLocalStorage = (key: string, defaultValue: any) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  } catch (error) {
    return defaultValue;
  }
};

export const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(() =>
    loadFromLocalStorage("darkMode", false)
  );

  const toggleDarkMode = () => {
    setDarkMode((prevMode: boolean) => {
      const newMode = !prevMode;
      saveToLocalStorage("darkMode", newMode);
      return newMode;
    });
  };

  const [writerInfo, setWriterInfo] = useState<WriterInfo>(() => {
    const loadedWriterInfo = loadFromLocalStorage("writerInfo", {
      name: "",
      writingLength: null,
      reviewSessionCount: null,
      startDate: null,
    });

    if (loadedWriterInfo.startDate) {
      if (dayjs(loadedWriterInfo.startDate).isBefore(dayjs())) {
        loadedWriterInfo.startDate = dayjs().toDate();
      }
    }

    return loadedWriterInfo;
  });

  const [tableData, setTableData] = useState<TableItem[]>(() =>
    loadFromLocalStorage("tableData", [{ ...emptyRow }, { ...emptyRow }])
  );

  useEffect(() => {
    saveToLocalStorage("writerInfo", writerInfo);
  }, [writerInfo]);

  useEffect(() => {
    saveToLocalStorage("tableData", tableData);
  }, [tableData]);

  return (
    <AppContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        writerInfo,
        setWriterInfo,
        tableData,
        setTableData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === null) {
    throw new Error("useAppContext must be used within a FormProvider");
  }
  return context;
}
