import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Container, Fab, Grid } from "@mui/material";
import { Close } from "@mui/icons-material";

import { fetchQuestions } from "./utils";

import { AnsweredQuestions } from "./components/AnsweredQuestions";
import { AnsweredQuestionsDialog } from "./components/AnsweredQuestionsDialog";
import { Question } from "./components/Question";
import { RatioHeader } from "./components/RatioHeader";
import { Skeleton } from "./components/Skeleton";
import { StatusBar } from "./components/StatusBar";

function App() {
  const { data, fetchNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["questions"],
    queryFn: ({ pageParam }) => {
      const numQuestions = pageParam ? 5 : 1;

      return fetchQuestions(numQuestions);
    },
    getNextPageParam: () => true,
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<number, string>>({});
  const [isListVisible, setIsListVisible] = React.useState(false);
  const questions =
    data?.pages.reduce(
      (allQuestions, page) => [...allQuestions, ...page],
      []
    ) ?? [];
  const numCorrectAnswers = questions.reduce((numCorrect, question, index) => {
    if (answers[index] === question.correct_answer) {
      return numCorrect + 1;
    }

    return numCorrect;
  }, 0);
  const header = (
    <RatioHeader
      numCorrectAnswers={numCorrectAnswers}
      numTotalAnswers={Object.keys(answers).length}
    />
  );

  React.useEffect(() => {
    if (currentQuestionIndex + 1 === questions.length) {
      void fetchNextPage();
    }
  }, [currentQuestionIndex, fetchNextPage, questions.length]);

  return (
    <Container
      sx={{
        height: "100%",
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Grid container spacing={2}>
          {isLoading ? (
            <Grid item xs={12}>
              <Skeleton />
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Question
                correctAnswer={questions[currentQuestionIndex]?.correct_answer}
                incorrectAnswers={
                  questions[currentQuestionIndex]?.incorrect_answers ?? []
                }
                label={questions[currentQuestionIndex]?.question}
                onAnswer={(selectedAnswer: string) => {
                  if (!answers[currentQuestionIndex]) {
                    setAnswers((prevAnswers) => ({
                      ...prevAnswers,
                      [currentQuestionIndex]: selectedAnswer,
                    }));
                    setTimeout(
                      () =>
                        setCurrentQuestionIndex((prevIndex) => prevIndex + 1),
                      1000
                    );
                  }
                }}
                selectedAnswer={answers[currentQuestionIndex]}
              />
            </Grid>
          )}
        </Grid>
      </Container>
      <Fab
        aria-label="show answered questions"
        color="secondary"
        onClick={() => setIsListVisible(true)}
        sx={{ position: "fixed", bottom: 0, right: 0, margin: "1rem" }}
      >
        {`${numCorrectAnswers} / ${Object.keys(answers).length}`}
      </Fab>
      <AnsweredQuestionsDialog
        isOpen={isListVisible}
        handleClose={() => setIsListVisible(false)}
      >
        <StatusBar
          color="secondary"
          header={header}
          icon={<Close />}
          onIconClick={() => setIsListVisible(false)}
        />
        <AnsweredQuestions answers={answers} questions={questions} />
      </AnsweredQuestionsDialog>
    </Container>
  );
}

export default App;
