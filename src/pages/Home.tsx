import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Stack } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ResponsiveTextField from "../components/ResponsiveTextField";
import ApplicationTitle from "../components/ApplicationTitle";
import { useAppContext } from "../utils/AppContext";
import { useCallback, useEffect, useRef, useState } from "react";
import BubbleStack from "../components/BubbleStack";

export default function Home() {
  // Hooks
  const navigate = useNavigate();
  const { writerInfo, setWriterInfo } = useAppContext();
  const isNameEntered = writerInfo.name.length > 0;
  const [renderNameError, setRenderNameError] = useState(false);
  const nameEntryRef = useRef<HTMLInputElement>(null);

  // Helpers
  const handleSubmit = useCallback(() => {
    if (isNameEntered) {
      navigate("/scheduler");
    } else {
      setRenderNameError(true);
      if (nameEntryRef.current) {
        nameEntryRef.current.focus();
      }
    }
  }, [isNameEntered, navigate]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === "Return") {
        handleSubmit();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleSubmit, isNameEntered]);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      alignContent="center"
      sx={{
        height: "100svh",
        display: "grid",
        paddingTop: 5,
      }}
    >
      <BubbleStack />
      <Grid
        item
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          marginBottom: "5vh",
        }}
      >
        <ApplicationTitle
          title="VelocityDraft"
          subtitle="Flexible Application Essay Scheduler"
        />
      </Grid>

      <Grid item sx={{ padding: 1, paddingTop: 35 }}>
        <Stack direction="row" spacing={1}>
          <ResponsiveTextField
            label={"Enter your name here..."}
            borderRadius={40}
            inputRef={nameEntryRef}
            value={writerInfo.name}
            renderAsError={renderNameError}
            onChange={(e) => {
              setRenderNameError(false);
              setWriterInfo((prevWriterInfo) => ({
                ...prevWriterInfo,
                name: e.target.value,
              }));
            }}
          />
          <Button
            variant="contained"
            sx={{ borderRadius: 40, minWidth: 60 }}
            onClick={handleSubmit}
          >
            <ArrowForwardIcon />
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}
