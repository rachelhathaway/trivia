import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

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
  const shouldHighlightOption = (option: string) =>
    selectedAnswer && option !== selectedAnswer && option === correctAnswer;

  return (
    <FormControl>
      <FormLabel id="question">
        <Box sx={{ lineHeight: 1.25 }}>
          <h1 dangerouslySetInnerHTML={{ __html: label }} />
        </Box>
      </FormLabel>
      <RadioGroup
        aria-labelledby="question"
        onChange={(_, answer: string) => onAnswer(answer)}
        value={selectedAnswer}
      >
        {options.map((option, index) => (
          <FormControlLabel
            control={<Radio color={selectedColor} />}
            key={index}
            label={
              <Box
                sx={{
                  padding: "0.5rem 1rem",
                  display: "flex",
                  alignItems: "center",
                  columnGap: "0.5rem",
                }}
              >
                <span dangerouslySetInnerHTML={{ __html: option }} />
                {shouldHighlightOption(option) && (
                  <CheckCircle color="success" />
                )}
              </Box>
            }
            value={option}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
