import React, { useState } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import dayjs from "dayjs";
import ResponsiveDatePicker from "./ResponsiveDatePicker";
import ResponsiveTextField from "./ResponsiveTextField";

interface TableDataItem {
  recipient: string;
  essayCount: number;
  deadline: dayjs.Dayjs;
}

export default function ApplicationInfoTable() {
  const [tableData, setTableData] = useState<TableDataItem[]>([]);

  function isRowComplete(row: TableDataItem) {
    return row.recipient && row.essayCount && row.deadline;
  }

  function addEmptyRow() {
    // now how tf should i do this
    // const updatedTableData = [...tableData];
    // updatedTableData.push({
    //   recipient: null,
    //   essayCount: null,
    //   deadline: null,
    // });
    // setTableData(updatedTableData);
  }

  function handleChange(
    index: number,
    field: keyof TableDataItem,
    value: string | dayjs.Dayjs
  ) {
    const newTableData = [...tableData];

    if (newTableData[index]) {
      // Update table data
      const dataIsRecipient = field === "recipient" && typeof value == "string";
      const dataIsEssays = field === "essayCount" && typeof value == "number";
      const dataIsDeadline =
        field === "deadline" && value instanceof dayjs.Dayjs;

      if (dataIsRecipient) {
        newTableData[index].recipient = value;
      } else if (dataIsEssays) {
        newTableData[index].essayCount = value;
      } else if (dataIsDeadline) {
        newTableData[index].deadline = value;
      }
      setTableData(newTableData);

      // Add new row
      if (index == tableData.length - 1) {
        addEmptyRow();
      }
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
      <Grid container spacing={2} key={0}>
        <Grid item xs={4}>
          <ResponsiveTextField
            label="Recipient"
            borderRadius={7}
            value={tableData[0].recipient}
            onChange={(e) => handleInputChange(0, "recipient", e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <ResponsiveTextField
            label="Essays"
            borderRadius={7}
            value={tableData[0].essayCount}
            onChange={(e) => handleInputChange(0, "essays", e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <ResponsiveDatePicker
            label={"Deadline"}
            value={tableData[0].deadline}
            onChange={(e) => handleInputChange(0, "deadline", e.target.value)}
          />
        </Grid>
      </Grid>
      {tableData.map((row, index) => (
        <Grid container spacing={2} key={index}>
          <Grid item xs={4}>
            <ResponsiveTextField
              label="Recipient"
              borderRadius={7}
              value={row.recipient}
              onChange={(e) =>
                handleInputChange(index, "recipient", e.target.value)
              }
            />
          </Grid>
          <Grid item xs={4}>
            <ResponsiveTextField
              label="Essays"
              borderRadius={7}
              value={row.essayCount}
              onChange={(e) =>
                handleInputChange(index, "essays", e.target.value)
              }
            />
          </Grid>
          <Grid item xs={4}>
            <ResponsiveDatePicker
              label={"Deadline"}
              value={row.deadline}
              onChange={(e) =>
                handleInputChange(index, "deadline", e.target.value)
              }
            />
          </Grid>
        </Grid>
      ))}
    </div>
  );
}
