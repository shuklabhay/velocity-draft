import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

function NotFound() {
  let navigate = useNavigate();

  return (
    <div style={{ maxWidth: 350, margin: "auto" }}>
      <Typography variant="h2" color="secondary.dark">
        Page Not Found
      </Typography>
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        size="large"
        sx={{ marginBottom: 1 }}
        onClick={() => navigate("/")}
      >
        Go Home
      </Button>
    </div>
  );
}

export default NotFound;
