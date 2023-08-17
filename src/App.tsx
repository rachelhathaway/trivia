import React from "react";
import { Container } from "@mui/material";

import { useQuestions } from "./hooks";

import { AnsweredQuestions } from "./components/AnsweredQuestions";
import { AnsweredQuestionsDialog } from "./components/AnsweredQuestionsDialog";
import { Question } from "./components/Question";
import { Skeleton } from "./components/Skeleton";

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<number, string>>({});
  const { isLoadingQuestions, questions } = useQuestions(currentQuestionIndex);
  const numCorrectAnswers = questions.reduce((numCorrect, question, index) => {
    if (answers[index] === question.correct_answer) {
      return numCorrect + 1;
    }

    return numCorrect;
  }, 0);

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
        {isLoadingQuestions ? (
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
