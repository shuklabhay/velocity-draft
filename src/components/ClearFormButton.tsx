import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useFormContext } from "./FormContext";
import { emptyTableState, isTableEntirelyEmpty } from "../utils/table";

export default function ClearFormButton() {
  const { tableData, setTableData } = useFormContext();
  const [openDialog, setOpenDialog] = useState(false);

  const disableConditon =
    !(tableData.length > 2) || isTableEntirelyEmpty(tableData);

  const handleResetTable = () => {
    setTableData(emptyTableState);
    setOpenDialog(false);
  };

  return (
    <>
      <Button
        variant="contained"
        disabled={disableConditon}
        onClick={() => setOpenDialog(true)}
        sx={{ textTransform: "none" }}
      >
        Reset Table
      </Button>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Reset</DialogTitle>
        <DialogContent>
          Are you sure you want to reset the table? This will clear all entered
          data.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleResetTable}>Yes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
