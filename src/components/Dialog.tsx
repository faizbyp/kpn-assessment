import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { ReactNode } from "react";

interface DialogProps {
  title: string;
  actions: ReactNode;
  open: boolean;
  onClose: any;
  keepMounted?: boolean;
  children: ReactNode;
}

const DialogComp = ({ title, actions, open, onClose, keepMounted, children }: DialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-modal="true"
      fullWidth
      maxWidth="sm"
      closeAfterTransition
      keepMounted={keepMounted}
    >
      <DialogTitle>{title}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
};

export default DialogComp;
