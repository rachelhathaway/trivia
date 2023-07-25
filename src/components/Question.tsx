import { Box, Button } from "@mui/material";

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

  return (
    <>
      <Box sx={{ lineHeight: 1.25, marginTop: 0, textAlign: "center" }}>
        <h1 dangerouslySetInnerHTML={{ __html: label }} />
      </Box>
      <Box style={{ rowGap: 10, display: "flex", flexDirection: "column" }}>
        {options.map((option, index) => (
          <Button
            color={
              selectedAnswer && selectedAnswer == option
                ? selectedColor
                : undefined
            }
            key={index}
            onClick={() => onAnswer(option)}
            variant="outlined"
          >
            <span dangerouslySetInnerHTML={{ __html: option }} />
          </Button>
        ))}
      </Box>
    </>
  );
};
