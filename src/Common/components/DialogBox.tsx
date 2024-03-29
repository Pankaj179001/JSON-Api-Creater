"use client";
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
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  heading: string;
  description?: string;
  children: React.ReactNode;
}) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            console.log(formJson);
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
          <button type="submit">Submit</button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
