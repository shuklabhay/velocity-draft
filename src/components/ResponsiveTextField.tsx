import * as React from "react";
import { TextField } from "@mui/material";

export default function ResponsiveTextField({
  label,
  borderRadius = 5,
  value,
  renderAsError = false,
  onChange,
}: {
  label: string;
  borderRadius: number;
  value: string;
  renderAsError: boolean;
  onChange: (e: any) => void;
}) {
  return (
    <TextField
      label={label}
      fullWidth
      value={value}
      onChange={onChange}
      error={renderAsError}
      InputLabelProps={{
        shrink: false,
        style: {
          marginTop: "1px",
          opacity: value.length > 0 ? 0 : 1,
        },
      }}
      InputProps={{
        style: {
          borderRadius: borderRadius,
        },
      }}
    ></TextField>
  );
}
