import { Button, Divider, Stack, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BubbleStack from "./BubbleStack";

export default function AppBar() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Stack
      sx={{
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        backgroundColor: theme.palette.secondary.main,
      }}
    >
      <Stack>
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
        <BubbleStack />
      </Stack>

      <Divider
        flexItem
        sx={{
          borderRadius: 5,
          borderTopWidth: 1,
        }}
      />
    </Stack>
  );
}
