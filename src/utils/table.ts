import { TableItem } from "./types";

export const emptyRow: TableItem = {
  institution: "",
  essayCount: "",
  deadline: null,
};

export function isRowPartiallyFilled(row: TableItem) {
  const filledFields = [row.institution, row.essayCount, row.deadline].filter(
    Boolean
  ).length;
  return filledFields > 0 && filledFields < 3;
}

export function isRowEntirelyEmpty(row: TableItem) {
  return (
    row.institution === "" && row.essayCount === "" && row.deadline === null
  );
}

export function isTableEntirelyEmpty(table: TableItem[]) {
  return table.every((row) => isRowEntirelyEmpty(row));
}

export function isRowEntirelyFull(row: TableItem) {
  return (
    row.institution !== "" && row.essayCount !== "" && row.deadline !== null
  );
}

export function isTableReadyToCreateEvents(tableData: TableItem[]) {
  let emptyRows = 0;
  let isValid = true;

  tableData.forEach((row) => {
    if (isRowEntirelyEmpty(row)) {
      emptyRows += 1;
    } else if (!isRowEntirelyFull(row)) {
      isValid = false;
    }
  });

  if (emptyRows == tableData.length) {
    return false;
  } else {
    return isValid;
  }
}
