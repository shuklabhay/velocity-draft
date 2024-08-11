import { Button, Stack } from "@mui/material";
import { NavigateAction, ToolbarProps, View } from "react-big-calendar";

export default function CustomToolbar(props: ToolbarProps) {
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
          onClick={() => navigate("TODAY")}
          sx={{ textTransform: "none" }}
        >
          Today
        </Button>
        <Button onClick={() => navigate("PREV")} sx={{ textTransform: "none" }}>
          Back
        </Button>
        <Button onClick={() => navigate("NEXT")} sx={{ textTransform: "none" }}>
          Next
        </Button>
      </Stack>
      <span>{label}</span>
      <Stack direction="row" spacing={1}>
        {viewButtons}
      </Stack>
    </Stack>
  );
}
