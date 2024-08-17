import { createContext, useState, useContext } from "react";
import { TableItem, WriterInfo } from "../utils/types";
import { emptyRow } from "../utils/table";

interface FormContextType {
  writerInfo: WriterInfo;
  setWriterInfo: React.Dispatch<React.SetStateAction<WriterInfo>>;
  tableData: TableItem[];
  setTableData: React.Dispatch<React.SetStateAction<TableItem[]>>;
}

export const FormContext = createContext<FormContextType | null>(null);

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [writerInfo, setWriterInfo] = useState<WriterInfo>({
    name: "",
    writingLength: null,
    reviewSessionCount: null,
    startDate: null,
  });
  const [tableData, setTableData] = useState<TableItem[]>([
    { ...emptyRow },
    { ...emptyRow },
  ]);

  return (
    <FormContext.Provider
      value={{ writerInfo, setWriterInfo, tableData, setTableData }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (context === null) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
}
