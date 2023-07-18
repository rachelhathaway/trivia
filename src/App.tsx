import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Container, Grid } from "@mui/material";

import { fetchQuestions } from "./utils";

import { Question } from "./components/Question";
import { Skeleton } from "./components/Skeleton";

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
  const questions =
    data?.pages.reduce(
      (allQuestions, page) => [...allQuestions, ...page],
      []
    ) ?? [];

  React.useEffect(() => {
    if (currentQuestionIndex + 1 === questions.length) {
      void fetchNextPage();
    }
  }, [currentQuestionIndex, fetchNextPage, questions.length]);

  return (
    <Container
      maxWidth="sm"
      sx={{ height: "100%", display: "flex", alignItems: "center" }}
    >
      <Grid container spacing={2}>
        {isLoading ? (
          <Grid item xs={12}>
            <Skeleton />
          </Grid>
        ) : (
          <>
            <Grid item xs={12}>
              <Question
                correctAnswer={questions[currentQuestionIndex]?.correct_answer}
                incorrectAnswers={
                  questions[currentQuestionIndex]?.incorrect_answers ?? []
                }
                label={questions[currentQuestionIndex]?.question}
                onAnswer={(selectedAnswer: string) => {
                  setAnswers((prevAnswers) => ({
                    ...prevAnswers,
                    [currentQuestionIndex]: selectedAnswer,
                  }));
                  setTimeout(
                    () => setCurrentQuestionIndex((prevIndex) => prevIndex + 1),
                    1000
                  );
                }}
                selectedAnswer={answers[currentQuestionIndex]}
              />
            </Grid>
            <Grid item xs={12}></Grid>
          </>
        )}
      </Grid>
    </Container>
  );
}

export default App;
