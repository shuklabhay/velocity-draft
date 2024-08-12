import React, { useState } from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import ResponsiveDatePicker from "./ResponsiveDatePicker";
import ResponsiveTextField from "./ResponsiveTextField";
import { TableItem } from "../utils/types";

export default function ApplicationTable() {
  const [tableData, setTableData] = useState<TableItem[]>([
    { recipient: "", essayCount: "", deadline: null },
    { recipient: "", essayCount: "", deadline: null },
  ]);

  function isRowEmpty(row: TableItem) {
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
    field: keyof TableItem,
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
        value.toDate() !== newTableData[index].deadline
          ? (isInfoAdded = true)
          : (isInfoAdded = false);

        newTableData[index].deadline = value.toDate();
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
      <Grid container spacing={2} direction={"row"}>
        <Grid item xs={4}>
          <Typography variant="h6">Recipient</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6">Essay Requirement</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6">Deadline</Typography>
        </Grid>
      </Grid>
      {tableData.map((row, index) => (
        <Grid container spacing={2} key={index} sx={{ paddingBottom: 1 }}>
          <Grid item xs={4}>
            <ResponsiveTextField
              label="Recipient"
              borderRadius={5}
              value={row.recipient}
              onChange={(e) => handleChange(index, "recipient", e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              {!row.essayCount && (
                <InputLabel shrink={false}>Essays</InputLabel>
              )}
              <Select
                value={row.essayCount}
                onChange={(e) => {
                  handleChange(index, "essayCount", e.target.value);
                }}
              >
                <MenuItem value={"1"}>1 Essay</MenuItem>
                <MenuItem value={"2"}>2 Essays</MenuItem>
                <MenuItem value={"3"}>3 Essays</MenuItem>
                <MenuItem value={"4"}>4 Essays</MenuItem>
                <MenuItem value={"5"}>5 Essays</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <ResponsiveDatePicker
              label={"Deadline"}
              value={row.deadline ? dayjs(row.deadline) : undefined}
              onChange={(newValue) => handleChange(index, "deadline", newValue)}
            />
          </Grid>
        </Grid>
      ))}
    </div>
  );
}
