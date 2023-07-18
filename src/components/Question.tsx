import {
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
        <span dangerouslySetInnerHTML={{ __html: label }} />
      </FormLabel>
      <RadioGroup
        aria-labelledby="question"
        onChange={(_, selectedAnswer: string) => onAnswer(selectedAnswer)}
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
