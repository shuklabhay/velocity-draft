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
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ResponsiveTextField from "./ResponsiveTextField";
import { useAppContext } from "../utils/AppContext";
import { useMemo, useState } from "react";
import { emptyRow, isTableEntirelyEmpty } from "../utils/table";

export default function InfoBubble() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { writerInfo, setWriterInfo, tableData, setTableData } =
    useAppContext();
  const [tempName, setTempName] = useState(writerInfo.name);

  function toggleOpen() {
    if (tempName && tempName !== writerInfo.name) {
      setWriterInfo((prevWriterInfo) => ({
        ...prevWriterInfo,
        name: tempName,
      }));
    }

    setOpen(!open);
  }

  const isAppDataEmpty = useMemo(() => {
    const isWriterInfoEmpty =
      !writerInfo.name &&
      !writerInfo.writingLength &&
      !writerInfo.reviewSessionCount &&
      !writerInfo.startDate &&
      !tempName;

    return isWriterInfoEmpty && isTableEntirelyEmpty(tableData);
  }, [writerInfo, tableData, tempName]);

  function resetAppData() {
    setTempName("");
    setWriterInfo({
      name: "",
      writingLength: null,
      reviewSessionCount: null,
      startDate: null,
    });
    setTableData([{ ...emptyRow }, { ...emptyRow }]);
  }

  return (
    <>
      <IconButton onClick={toggleOpen}>
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
            VelocityDraft won third place in the 2023 OneHacks III hackathon. No
            user data is ever stored or saved. Application is 100% open source,{" "}
            <a
              href="https://github.com/shuklabhay/velocity-draft"
              target="_blank"
              rel="noopener noreferrer"
            >
              view on GitHub
            </a>
            .
          </DialogContentText>
        </DialogContent>

        <Divider
          sx={{
            marginLeft: 8,
            marginRight: 8,
            borderRadius: 5,
          }}
        />

        <DialogTitle sx={{ paddingtop: 0, paddingBottom: 1 }}>
          Config
        </DialogTitle>
        <DialogContent>
          <Stack>
            <DialogContentText>Modify/Enter Name:</DialogContentText>
            <ResponsiveTextField
              label={"Enter your name here..."}
              borderRadius={5}
              inputRef={null}
              value={tempName}
              renderAsError={false}
              onChange={(e) => {
                setTempName(e.target.value);
              }}
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button
            color="error"
            variant="contained"
            disabled={isAppDataEmpty}
            onClick={resetAppData}
            sx={{ padding: 1, textTransform: "none", marginRight: "auto" }}
          >
            Reset App Data
          </Button>
          <Button
            autoFocus
            variant="contained"
            onClick={toggleOpen}
            sx={{ padding: 1, textTransform: "none" }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
