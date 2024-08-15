import * as React from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ResponsiveTextField from "./ResponsiveTextField";
import { useNameContext } from "./NameContext";

export default function InfoBubble() {
  const [open, setOpen] = React.useState(false);
  const { name, setName } = useNameContext();
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
          bottom: "auto",
          top: 5,
          right: 8,
          zIndex: 9999,
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
        <DialogTitle sx={{ fontWeight: "bold", paddingBottom: 0 }}>
          About VelocityDraft
        </DialogTitle>
        <DialogTitle
          variant="subtitle1"
          sx={{ paddingtop: 0, paddingBottom: 1 }}
        >
          What is VelocityDraft?
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
            plans to write essays for high school applications, summer program
            applications, college applications, internship applications,
            graduate program applications, and more! If you need to write a lot
            of essays to apply, VelocityDraft has you covered!
          </DialogContentText>
          <br />
          <DialogContentText>
            VelocityDraft won third place in the OneHacks III hackathon. No user
            data is ever stored or saved.
          </DialogContentText>
        </DialogContent>

        <Divider
          sx={{
            marginRight: 12,
            borderRadius: 5,
          }}
        />

        <DialogTitle
          variant="subtitle1"
          sx={{ paddingtop: 0, paddingBottom: 1 }}
        >
          Config
        </DialogTitle>
        <DialogContent>
          <Stack>
            <DialogContentText>Change your name:</DialogContentText>
            <ResponsiveTextField
              label={"Enter your name here..."}
              borderRadius={5}
              value={name}
              renderAsError={false}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Stack>
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
