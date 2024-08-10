import * as React from "react";
import { TextField } from "@mui/material";

export default function ResponsiveTextField({
  label,
  borderRadius = 7,
  value,
  setValue,
}: {
  label: string;
  borderRadius: number;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <TextField
      label={label}
      fullWidth
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
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
