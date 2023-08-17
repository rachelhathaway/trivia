import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Container } from "@mui/material";

import { fetchQuestions } from "./utils";

import { AnsweredQuestions } from "./components/AnsweredQuestions";
import { AnsweredQuestionsDialog } from "./components/AnsweredQuestionsDialog";
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
  const numCorrectAnswers = questions.reduce((numCorrect, question, index) => {
    if (answers[index] === question.correct_answer) {
      return numCorrect + 1;
    }

    return numCorrect;
  }, 0);

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
        {isLoading ? (
          <Skeleton />
        ) : (
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
                  () => setCurrentQuestionIndex((prevIndex) => prevIndex + 1),
                  1000
                );
              }
            }}
            selectedAnswer={answers[currentQuestionIndex]}
          />
        )}
      </Container>
      <AnsweredQuestionsDialog
        numCorrectAnswers={numCorrectAnswers}
        numTotalAnswers={Object.keys(answers).length}
      >
        <AnsweredQuestions answers={answers} questions={questions} />
      </AnsweredQuestionsDialog>
    </Container>
  );
}

export default App;
