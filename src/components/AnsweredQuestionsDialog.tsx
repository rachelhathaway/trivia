import React from "react";
import { Dialog, Slide } from "@mui/material";
import type { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type AnsweredQuestionsDialogProps = React.PropsWithChildren & {
  handleClose: () => void;
  isOpen: boolean;
};

export const AnsweredQuestionsDialog = ({
  children,
  handleClose,
  isOpen,
}: AnsweredQuestionsDialogProps) => (
  <Dialog
    fullScreen
    open={isOpen}
    onClose={handleClose}
    TransitionComponent={Transition}
  >
    {children}
  </Dialog>
);
