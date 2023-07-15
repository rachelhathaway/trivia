import React from "react";
import { Container, Grid } from "@mui/material";

import type { Question as QuestionType } from "./types";

import { fetchQuestions } from "./utils";

import { Pagination } from "./components/Pagination";
import { Question } from "./components/Question";
import { Skeleton } from "./components/Skeleton";

function App() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [questions, setQuestions] = React.useState<QuestionType[]>([]);
  const [answers, setAnswers] = React.useState<Record<number, string>>({});

  React.useEffect(() => {
    setIsLoading(true);

    const fetch = async () => {
      const response = await fetchQuestions();

      setQuestions(response);
      setIsLoading(false);
    };

    void fetch();
  }, []);

  return (
    <Container>
      <Grid container spacing={2}>
        {isLoading ? (
          <Grid item xs={12}>
            <Skeleton />
          </Grid>
        ) : (
          <>
            <Grid item xs={12}>
              <Question
                label={questions[page - 1]?.question}
                onAnswer={(selectedAnswer: string) => {
                  setAnswers((prevAnswers) => ({
                    ...prevAnswers,
                    [page]: selectedAnswer,
                  }));
                }}
                options={[
                  questions[page - 1]?.correct_answer,
                  ...(questions[page - 1]?.incorrect_answers ?? []),
                ].sort()}
                selectedAnswer={answers[page]}
              />
            </Grid>
            <Grid item xs={12}>
              <Pagination page={page} onChange={setPage} />
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
}

export default App;
