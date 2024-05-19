import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import OTPInput from "./ClassCode";
import { useUserData, uselocalStore } from "../store/store";
import { Alert } from "@mui/material";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { joinClass } from "../helper/helper";

export default function MuiDialogBox() {
  const { decodedData } = useUserData();
  const [open, setOpen] = React.useState(false);
  const { setJoinClassOpen, EnteredClassCode } = uselocalStore();
  const [validate, setValidate] = React.useState(false);

  const { roleID } = decodedData(localStorage.getItem("token"));

  useGSAP(
    () => {
      gsap.fromTo("#alert", { y: 1000 }, { y: 0, duration: 0.3 });
    },
    { dependencies: [validate] }
  );

  const handleClickOpen = () => {
    setOpen(true);
    setJoinClassOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setJoinClassOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          color: "white",
          borderColor: "white",

          "&:hover": {
            borderColor: "gray",
          },
        }}
      >
        Join Class
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",

          onSubmit: (event) => {
            event.preventDefault();
            console.log(EnteredClassCode);
            joinClass(roleID, EnteredClassCode);
            if (EnteredClassCode.length < 6 || !EnteredClassCode) {
              setValidate(true);
              setTimeout(() => {
                setValidate(false);
              }, 2000);
            } else {
              setValidate(false);
              handleClose();
            }
          },

          sx: {
            backgroundColor: "#070808",
            borderRadius: "20px",
            // backdropFilter: "blur(10px)",
            color: "white",
          },
        }}
      >
        <DialogTitle>Join class</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <DialogContentText
            sx={{
              color: "white",
            }}
          >
            To join a class Enter a class code provided by your Teacher.
          </DialogContentText>

          <OTPInput />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              color: "white",
              borderRadius: "20px",

              "&:hover": {
                bgcolor: "#fff2",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            sx={{
              color: "white",
              borderRadius: "20px",

              "&:hover": {
                bgcolor: "#fff2",
              },
            }}
          >
            Join
          </Button>
        </DialogActions>
      </Dialog>
      {validate && (
        <div id="alert" className=" fixed bottom-10">
          <Alert severity="error">Enter valid Class code!!!</Alert>
        </div>
      )}
    </React.Fragment>
  );
}
