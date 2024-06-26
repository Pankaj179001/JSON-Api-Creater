"use client";
import { SxProps } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";

export default function FormDialog({
  heading,
  description,
  open,
  setOpen,
  children,
  onSubmit,
  buttonDisabled,
  onClose,
  sx,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit?: (data: any) => void;
  heading: string;
  description?: string;
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  buttonDisabled?: boolean;
  onClose?: () => void;
  sx?: SxProps;
}) {
  const handleClose = () => {
    onClose && onClose();
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={sx}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            onSubmit && onSubmit(event);
            handleClose();
          },
        }}
      >
        <DialogTitle>{heading}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description && description}</DialogContentText>
          {children}
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button disabled={buttonDisabled ?? false} type="submit">
            Submit
          </button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
