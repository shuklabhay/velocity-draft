import { Button, Grid, Stack, Typography } from "@mui/material";
import { NavigateAction, ToolbarProps, View } from "react-big-calendar";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

export default function ResponsiveToolbar(props: ToolbarProps) {
  const { onNavigate, label, onView, view } = props;

  function navigate(action: NavigateAction) {
    onNavigate(action);
  }

  const viewNames: View[] = ["month", "agenda"];
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
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        paddingBottom: 2,
        flexDirection: { xs: "column", md: "row" },
      }}
      spacing={1}
    >
      <Grid item>
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            onClick={() => navigate("PREV")}
            sx={{ textTransform: "none", minWidth: "5%" }}
          >
            <ArrowLeftIcon />
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate("TODAY")}
            sx={{ textTransform: "none" }}
          >
            Today
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate("NEXT")}
            sx={{ textTransform: "none", minWidth: "5%" }}
          >
            <ArrowRightIcon />
          </Button>
        </Stack>
      </Grid>
      <Grid item>
        <Typography variant="h5">{label}</Typography>
      </Grid>
      <Grid item>
        <Stack direction="row" spacing={1}>
          {viewButtons}
        </Stack>
      </Grid>
    </Grid>
  );
}
