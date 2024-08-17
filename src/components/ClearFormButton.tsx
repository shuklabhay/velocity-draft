import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  useTheme,
  DialogContentText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormContext } from "./FormContext";
import { emptyTableState, isTableEntirelyEmpty } from "../utils/table";

export default function ClearFormButton() {
  const theme = useTheme();
  const { tableData, setTableData } = useFormContext();
  const [openDialog, setOpenDialog] = useState(false);

  const disableConditon =
    !(tableData.length > 2) || isTableEntirelyEmpty(tableData);

  const handleResetTable = () => {
    setTableData({ ...emptyTableState });
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
        <DialogTitle>Reset Table</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setOpenDialog(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            "&:hover": {
              color: theme.palette.primary.dark,
              backgroundColor: theme.palette.secondary.main,
            },
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ paddingTop: 0 }}>
          <DialogContentText>
            Are you sure you want to clear all your entered institution
            information?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => setOpenDialog(false)}
            sx={{ textTransform: "none" }}
          >
            No
          </Button>
          <Button
            variant="contained"
            onClick={handleResetTable}
            sx={{ textTransform: "none" }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
