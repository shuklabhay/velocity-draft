import React from "react";
import InfoBubble from "./InfoBubble";
import DarkModeBubble from "./DarkModeBubble";
import { Stack, useTheme } from "@mui/material";

export default function BubbleStack() {
  const theme = useTheme();

  return (
    <Stack
      direction={{ xs: "row" }}
      sx={{
        position: "fixed",
        bottom: "auto",
        top: 5,
        right: 8,
        zIndex: 9999,
        borderRadius: 20,
        color: theme.palette.primary.main,
        backgroundColor: {
          xs: theme.palette.secondary.main,
          md: theme.palette.secondary.main,
        },
      }}
    >
      <DarkModeBubble />
      <InfoBubble />
    </Stack>
  );
}
