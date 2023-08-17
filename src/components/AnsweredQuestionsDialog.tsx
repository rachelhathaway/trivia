import React from "react";
import { Close } from "@mui/icons-material";
import { Dialog, Fab, Slide } from "@mui/material";
import type { TransitionProps } from "@mui/material/transitions";

import { RatioHeader } from "./RatioHeader";
import { StatusBar } from "./StatusBar";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type AnsweredQuestionsDialogProps = React.PropsWithChildren & {
  numCorrectAnswers: number;
  numTotalAnswers: number;
};

export const AnsweredQuestionsDialog = ({
  children,
  numCorrectAnswers,
  numTotalAnswers,
}: AnsweredQuestionsDialogProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const closeDialog = () => setIsOpen(false);

  return (
    <>
      <Fab
        aria-label="show answered questions"
        color="primary"
        onClick={() => setIsOpen(true)}
        sx={{ position: "fixed", bottom: 0, right: 0, margin: "1rem" }}
      >
        {`${numCorrectAnswers} / ${numTotalAnswers}`}
      </Fab>
      <Dialog
        fullScreen
        open={isOpen}
        onClose={closeDialog}
        TransitionComponent={Transition}
      >
        <StatusBar
          header={
            <RatioHeader
              numCorrectAnswers={numCorrectAnswers}
              numTotalAnswers={numTotalAnswers}
            />
          }
          icon={<Close />}
          onIconClick={closeDialog}
        />
        {children}
      </Dialog>
    </>
  );
};
