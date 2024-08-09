import * as React from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function InfoBubble() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <IconButton
        onClick={toggleOpen}
        sx={{
          position: "fixed",
          bottom: 7,
          right: 8,
          color: theme.palette.primary.main,
          "&:hover": {
            color: theme.palette.primary.dark,
            backgroundColor: theme.palette.secondary.main,
          },
        }}
      >
        <InfoOutlinedIcon fontSize="medium" />
      </IconButton>
      <Dialog onClose={toggleOpen} open={open}>
        <DialogTitle>About VelocityDraft</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={toggleOpen}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            VelocityDraft is flexible application essay writing scheduler a
            developed by Abhay Shukla and Michael Leong. The application was
            originally made to help high school students plan writing their
            college application essays, but it can be used for any kind of
            application essay (high school, undergrad, grad)!
          </Typography>
          <Typography gutterBottom>
            VelocityDraft won third place in the OneHacks III hackathon.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus variant="contained" onClick={toggleOpen}>
            Close Menu
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default InfoBubble;
