import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

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
            control={
              <Radio
                color={selectedAnswer === correctAnswer ? "success" : "error"}
              />
            }
            key={index}
            label={<span dangerouslySetInnerHTML={{ __html: option }} />}
            value={option}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
