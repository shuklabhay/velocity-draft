import React, { Dispatch, SetStateAction, useState } from "react";
import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import dayjs from "dayjs";
import ResponsiveDatePicker from "./ResponsiveDatePicker";
import ResponsiveTextField from "./ResponsiveTextField";
import { TableItem } from "../utils/types";
import { isRowEntirelyEmpty, isRowPartiallyFilled } from "../utils/table";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function ApplicationTable({
  minDate,
  tableData,
  setTableData,
}: {
  minDate: Date;
  tableData: TableItem[];
  setTableData: Dispatch<SetStateAction<TableItem[]>>;
}) {
  const theme = useTheme();

  // Helpers
  function arePreviousRowsEmpty(index: number) {
    for (let i = 0; i < index; i++) {
      if (tableData[i] && isRowEntirelyEmpty(tableData[i]!)) {
        return true;
      }
    }
    return false;
  }

  function addEmptyRow() {
    setTableData([
      ...tableData,
      {
        institution: "",
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
      const dataIsInstitution =
        field === "institution" && typeof value == "string";
      const dataIsEssays = field === "essayCount" && typeof value == "string";
      const dataIsDeadline = field === "deadline" && dayjs.isDayjs(value);

      if (dataIsInstitution) {
        value.length > newTableData[index].institution.length
          ? (isInfoAdded = true)
          : (isInfoAdded = false);

        newTableData[index].institution = value;
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

  function handleDelete(row: TableItem) {}

  return (
    <div>
      <Grid container spacing={2} direction={"row"}>
        <Grid item xs={4}>
          <Typography variant="h6">Institution</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6">Essays</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6">Deadline</Typography>
        </Grid>
      </Grid>
      {tableData.map((row, index) => (
        <Grid container spacing={2} key={index} sx={{ paddingBottom: 1 }}>
          <Grid item xs={4}>
            <ResponsiveTextField
              label="Institution"
              borderRadius={5}
              value={row.institution}
              renderAsError={isRowPartiallyFilled(row) && !row.institution}
              onChange={(e) =>
                handleChange(index, "institution", e.target.value)
              }
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl
              fullWidth
              error={isRowPartiallyFilled(row) && !row.essayCount}
            >
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
                <MenuItem value={"6"}>6 Essays</MenuItem>
                <MenuItem value={"7"}>7 Essays</MenuItem>
                <MenuItem value={"8"}>8 Essays</MenuItem>
                <MenuItem value={"9"}>9 Essays</MenuItem>
                <MenuItem value={"10"}>10 Essays</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <Stack direction="row">
              <ResponsiveDatePicker
                label={"Deadline"}
                minDate={dayjs(minDate)}
                value={row.deadline ? dayjs(row.deadline) : null}
                renderAsError={isRowPartiallyFilled(row) && !row.deadline}
                onChange={(newValue) =>
                  handleChange(index, "deadline", newValue)
                }
              />
              <IconButton
                onClick={() => handleDelete(row)}
                sx={{
                  paddingBottom: 1.4,
                  transition: "none",
                  color: theme.palette.iconColor.main,
                  "&:hover": {
                    backgroundColor: "transparent",
                    "& svg": {
                      fill: isRowPartiallyFilled(row)
                        ? theme.palette.error.main
                        : theme.palette.iconColor.main,
                    },
                  },
                }}
              >
                <DeleteForeverIcon />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
      ))}
    </div>
  );
}
