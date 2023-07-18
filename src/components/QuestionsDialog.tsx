import React from "react";
import {
  AppBar,
  Box,
  Dialog,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Slide,
  Toolbar,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import type { TransitionProps } from "@mui/material/transitions";

import type { Question } from "../types";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type QuestionsDialogProps = {
  answers: Record<number, string>;
  handleClose: () => void;
  isOpen: boolean;
  questions: Question[];
};

export const QuestionsDialog = ({
  answers,
  handleClose,
  isOpen,
  questions,
}: QuestionsDialogProps) => {
  const answerIndexes = Object.keys(answers);

  return (
    <Dialog
      fullScreen
      open={isOpen}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar color="secondary" position="sticky">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>Questions</Box>
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
      {answerIndexes.length > 0 ? (
        <List>
          {answerIndexes.map((questionIndex, index) => {
            const question = questions[parseInt(questionIndex, 10)];

            return (
              <React.Fragment key={question.question}>
                <ListItem>
                  <ListItemText
                    primary={
                      <span
                        dangerouslySetInnerHTML={{
                          __html: question.question,
                        }}
                      />
                    }
                  />
                </ListItem>
                <List>
                  {[question.correct_answer, ...question.incorrect_answers].map(
                    (answer) => (
                      <ListItem key={answer}>
                        <ListItemText
                          inset
                          primary={
                            <span
                              dangerouslySetInnerHTML={{
                                __html: answer,
                              }}
                            />
                          }
                        />
                      </ListItem>
                    )
                  )}
                </List>
                {index !== answerIndexes.length - 1 && <Divider />}
              </React.Fragment>
            );
          })}
        </List>
      ) : (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          No questions answered yet!
        </Box>
      )}
    </Dialog>
  );
};
