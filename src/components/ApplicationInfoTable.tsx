import React, { useState } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import dayjs from "dayjs";
import ResponsiveDatePicker from "./ResponsiveDatePicker";
import ResponsiveTextField from "./ResponsiveTextField";

interface TableDataItem {
  recipient: string;
  essayCount: string;
  deadline: dayjs.Dayjs | null;
}

export default function ApplicationInfoTable() {
  const [tableData, setTableData] = useState<TableDataItem[]>([
    { recipient: "", essayCount: "", deadline: null },
    { recipient: "", essayCount: "", deadline: null },
  ]);

  function isRowComplete(row: TableDataItem) {
    return row.recipient && row.essayCount && row.deadline;
  }

  function isRowEmpty(row: TableDataItem) {
    return !row.recipient && !row.essayCount && !row.deadline;
  }

  function arePreviousRowsEmpty(index: number) {
    for (let i = 0; i < index; i++) {
      if (tableData[i]) {
        if (isRowEmpty(tableData[i]!)) {
          return true;
        }
      }
    }
    return false;
  }

  function addEmptyRow() {
    setTableData([
      ...tableData,
      {
        recipient: "",
        essayCount: "",
        deadline: null,
      },
    ]);
  }

  function handleChange(
    index: number,
    field: keyof TableDataItem,
    value: string | dayjs.Dayjs
  ) {
    const newTableData = [...tableData];
    let isInfoAdded = false;

    // Update table data
    if (newTableData[index]) {
      const dataIsRecipient = field === "recipient" && typeof value == "string";
      const dataIsEssays = field === "essayCount" && typeof value == "string";
      const dataIsDeadline = field === "deadline" && dayjs.isDayjs(value);

      if (dataIsRecipient) {
        value.length > newTableData[index].recipient.length
          ? (isInfoAdded = true)
          : (isInfoAdded = false);

        newTableData[index].recipient = value;
      } else if (dataIsEssays) {
        value.length > newTableData[index].essayCount.length
          ? (isInfoAdded = true)
          : (isInfoAdded = false);

        newTableData[index].essayCount = value;
      } else if (dataIsDeadline) {
        value !== newTableData[index].deadline
          ? (isInfoAdded = true)
          : (isInfoAdded = false);

        newTableData[index].deadline = value;
      }
      setTableData(newTableData);
    }
    // Add new row
    const lastRowAddition =
      isInfoAdded &&
      index == tableData.length - 1 &&
      !arePreviousRowsEmpty(index);
    const chartFillingAddition =
      isInfoAdded && !arePreviousRowsEmpty(tableData.length);

    if (lastRowAddition || chartFillingAddition) {
      addEmptyRow();
    }
  }

  return (
    <div>
      <Grid container spacing={0.5} direction={"row"} sx={{}}>
        <Grid item xs={4}>
          <Typography variant="h6">Recipient</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6">Essay Count</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6">Deadline</Typography>
        </Grid>
      </Grid>
      {tableData.map((row, index) => (
        <Grid container spacing={2} key={index}>
          <Grid item xs={4}>
            <ResponsiveTextField
              label="Recipient"
              borderRadius={7}
              value={row.recipient}
              onChange={(e) => handleChange(index, "recipient", e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <ResponsiveTextField
              label="Essays"
              borderRadius={7}
              value={row.essayCount}
              onChange={(e) =>
                handleChange(index, "essayCount", e.target.value)
              }
            />
          </Grid>
          <Grid item xs={4}>
            <ResponsiveDatePicker
              label={"Deadline"}
              value={row.deadline ? row.deadline : undefined}
              onChange={(newValue) => handleChange(index, "deadline", newValue)}
            />
          </Grid>
        </Grid>
      ))}
    </div>
  );
}
