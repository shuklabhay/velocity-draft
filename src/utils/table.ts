import { TableItem } from "./types";

export function isRowEntirelyEmpty(row: TableItem) {
  return (
    row.institution === "" && row.essayCount === "" && row.deadline === null
  );
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
