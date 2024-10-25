import { ReactNode, useState } from "react";
import DialogComp from "../components/Dialog";

const useDialog = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [actions, setActions] = useState<ReactNode>(null);
  const [children, setChildren] = useState<ReactNode>(null);

  const showDialog = (dialogTitle: string, dialogActions: ReactNode, dialogChildren: ReactNode) => {
    setTitle(dialogTitle);
    setActions(dialogActions);
    setChildren(dialogChildren);
    setOpen(true);
  };

  const closeDialog = () => {
    // if (reason && reason === "backdropClick") return;
    setOpen(false);
  };

  const Dialog = (
    <DialogComp
      title={title}
      actions={actions}
      open={open}
      onClose={closeDialog}
      keepMounted={true}
    >
      {children}
    </DialogComp>
  );

  return { Dialog, showDialog, closeDialog };
};

export default useDialog;
