import * as React from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function InfoBubble() {
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
          [theme.breakpoints.down("sm")]: {
            bottom: "auto",
            top: 8,
          },
        }}
      >
        <InfoOutlinedIcon fontSize="medium" />
      </IconButton>

      <Dialog onClose={toggleOpen} open={open}>
        <DialogTitle sx={{ fontWeight: "bold" }}>
          About VelocityDraft
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={toggleOpen}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            "&:hover": {
              color: theme.palette.primary.dark,
              backgroundColor: theme.palette.secondary.main,
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent sx={{ paddingTop: 0 }}>
          <DialogContentText>
            VelocityDraft is flexible application essay writing scheduler a
            developed by Abhay Shukla and Michael Leong. The application was
            originally made to help high school students plan writing their
            college application essays, but VelocityDraft supports creating
            plans for high school applications, summer program applications,
            college applications, internship applications, graduate program
            applications, and many more! If you need to apply, VelocityDraft has
            you covered.
          </DialogContentText>
          <br />
          <DialogContentText>
            VelocityDraft won third place in the OneHacks III hackathon.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus variant="contained" onClick={toggleOpen}>
            <Typography textTransform="none">Close Menu</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
