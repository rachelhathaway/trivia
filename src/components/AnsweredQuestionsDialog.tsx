import React from "react";
import { AppBar, Dialog, IconButton, Slide, Toolbar } from "@mui/material";
import { Close } from "@mui/icons-material";
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
  header: React.ReactElement;
  isOpen: boolean;
};

export const AnsweredQuestionsDialog = ({
  children,
  handleClose,
  header,
  isOpen,
}: AnsweredQuestionsDialogProps) => (
  <Dialog
    fullScreen
    open={isOpen}
    onClose={handleClose}
    TransitionComponent={Transition}
  >
    <AppBar color="secondary" position="sticky">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {header}
        <IconButton
          aria-label="list"
          color="inherit"
          edge="start"
          onClick={handleClose}
          size="large"
        >
          <Close />
        </IconButton>
      </Toolbar>
    </AppBar>
    {children}
  </Dialog>
);
