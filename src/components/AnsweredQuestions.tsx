import React from "react";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Cancel, CheckCircle } from "@mui/icons-material";

import type { Question } from "../types";

type AnsweredQuestionsProps = {
  answers: Record<number, string>;
  questions: Question[];
};

export const AnsweredQuestions = ({
  answers,
  questions,
}: AnsweredQuestionsProps) => {
  const answerIndexes = Object.keys(answers);

  return answerIndexes.length > 0 ? (
    <List>
      {answerIndexes.map((questionIndex, index) => {
        const question = questions[parseInt(questionIndex, 10)];
        const selectedAnswer = answers[parseInt(questionIndex, 10)];
        const answeredCorrectly = selectedAnswer === question.correct_answer;

        return (
          <React.Fragment key={question.question}>
            <ListItem>
              <ListItemIcon>
                {answeredCorrectly ? (
                  <CheckCircle color="success" />
                ) : (
                  <Cancel color="error" />
                )}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Box>
                    <Box style={{ display: "flex", columnGap: "0.5rem" }}>
                      <span>Q:</span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: question.question,
                        }}
                      />
                    </Box>
                    <Box style={{ display: "flex", columnGap: "0.5rem" }}>
                      <span>A:</span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: question.correct_answer,
                        }}
                      />
                    </Box>
                  </Box>
                }
              />
            </ListItem>
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
  );
};
