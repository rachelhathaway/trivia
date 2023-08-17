import { Box, Button, Container } from "@mui/material";

type QuestionProps = {
  correctAnswer: string;
  incorrectAnswers: string[];
  label: string;
  onAnswer: (selectedAnswer: string) => void;
  selectedAnswer?: string;
};

export const Question = ({
  correctAnswer,
  incorrectAnswers,
  label,
  onAnswer,
  selectedAnswer = "",
}: QuestionProps) => {
  const options = [correctAnswer, ...incorrectAnswers].sort();
  const selectedColor = selectedAnswer === correctAnswer ? "success" : "error";
  const isSelectedAnswer = (option: string) =>
    selectedAnswer && selectedAnswer == option;

  return (
    <Container sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ lineHeight: 1.25, textAlign: "center" }}>
        <h1
          dangerouslySetInnerHTML={{ __html: label }}
          style={{ marginTop: 0 }}
        />
      </Box>
      <Box style={{ rowGap: 10, display: "flex", flexDirection: "column" }}>
        {options.map((option) => (
          <Button
            color={isSelectedAnswer(option) ? selectedColor : undefined}
            key={option}
            onClick={() => onAnswer(option)}
            variant={isSelectedAnswer(option) ? "contained" : "outlined"}
          >
            <span dangerouslySetInnerHTML={{ __html: option }} />
          </Button>
        ))}
      </Box>
    </Container>
  );
};
