import { Button, Stack, Typography } from "@mui/material";
import { NavigateAction, ToolbarProps, View } from "react-big-calendar";

export default function ResponsiveToolbar(props: ToolbarProps) {
  const { onNavigate, label, onView, view } = props;

  const navigate = (action: NavigateAction) => {
    onNavigate(action);
  };

  const viewNames: View[] = ["month", "week", "day", "agenda"];

  const viewButtons = viewNames.map((name) => (
    <Button
      key={name}
      onClick={() => onView(name)}
      variant={view === name ? "contained" : "outlined"}
      sx={{ textTransform: "capitalize" }}
    >
      {name}
    </Button>
  ));

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ paddingBottom: 2 }}
    >
      <Stack direction="row" spacing={1}>
        <Button
          variant="contained"
          onClick={() => navigate("TODAY")}
          sx={{ textTransform: "none" }}
        >
          Today
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate("PREV")}
          sx={{ textTransform: "none" }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate("NEXT")}
          sx={{ textTransform: "none" }}
        >
          Next
        </Button>
      </Stack>
      <Typography variant="h5">{label}</Typography>
      <Stack direction="row" spacing={1}>
        {viewButtons}
      </Stack>
    </Stack>
  );
}
