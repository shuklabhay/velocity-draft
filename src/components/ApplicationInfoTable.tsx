import React, { useState } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import dayjs from "dayjs";
import ResponsiveDatePicker from "./ResponsiveDatePicker";
import ResponsiveTextField from "./ResponsiveTextField";

// code partially generated with gemini- im spending a lot of time reformatting it to work on my case w/ my wrappers and stuff
interface FormDataItem {
  recipient: string;
  essays: string;
  deadline: dayjs.Dayjs;
}

export default function ApplicationInfoTable() {
  const [formData, setFormData] = useState<FormDataItem[]>([]);

  const handleInputChange = (index, field, value) => {
    const updatedFormData = [...formData];
    updatedFormData[index][field] = value;
    setFormData(updatedFormData);
    if (
      index === updatedFormData.length - 1 &&
      isRowComplete(updatedFormData[index])
    ) {
      addEmptyRow();
    }
  };

  const isRowComplete = (row) => {
    return row.recipient && row.essays && row.deadline;
  };

  const addEmptyRow = () => {
    setFormData([...formData, { recipient: "", essays: "", deadline: "" }]);
  };

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
      {formData.map((row, index) => (
        <Grid container spacing={2} key={index}>
          <Grid item xs={4}>
            <TextField
              label="recipient"
              variant="outlined"
              fullWidth
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
              value={row.essays}
              onChange={(e) =>
                handleInputChange(index, "essays", e.target.value)
              }
            />

            <TextField
              label="Essays"
              variant="outlined"
              fullWidth
              value={row.essays}
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
