import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Divider, Stack, Typography, useTheme } from "@mui/material";
import * as React from "react";
import { useNameContext } from "./NameContext";

export default function NotFound() {
  const theme = useTheme();
  const { name } = useNameContext();
  const navigate = useNavigate();

  return (
    <>
      <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
        <Button
          disableRipple
          onClick={() => navigate("/")}
          sx={{
            backgroundColor: "transparent",
            width: 145,
            height: 45,
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: "bold",
              textAlign: "center",
              textTransform: "none",
              paddingTop: "6px",
            }}
          >
            VelocityDraft
          </Typography>
        </Button>
        <Divider
          flexItem
          sx={{
            borderRadius: 5,
            borderTopWidth: 1,
          }}
        />
      </Stack>

      <Typography variant="h4" sx={{ paddingTop: 1, paddingBottom: 2 }}>
        Hi{" "}
        <span
          style={{
            color: theme.palette.primary.main,
            fontWeight: "bold",
          }}
        >
          user,
        </span>{" "}
        you've reached a page that doesn't exist.
      </Typography>
    </>
  );
}
