import * as React from "react";
import InfoIcon from "@mui/icons-material/Info";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function InfoBubble() {
  const [open, setOpen] = React.useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <IconButton onClick={toggleOpen}>
        <InfoIcon />
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
          <Button autoFocus onClick={toggleOpen}>
            Close Menu
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default InfoBubble;
