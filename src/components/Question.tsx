import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

type QuestionProps = {
  label: string;
  onAnswer: (selectedAnswer: string) => void;
  options: string[];
  selectedAnswer?: string;
};

export const Question = ({
  label,
  onAnswer,
  options,
  selectedAnswer = "",
}: QuestionProps) => (
  <FormControl>
    <FormLabel id="question">{label}</FormLabel>
    <RadioGroup
      aria-labelledby="question"
      onChange={(_, selectedAnswer: string) => onAnswer(selectedAnswer)}
      value={selectedAnswer}
    >
      {options.map((option, index) => (
        <FormControlLabel
          control={<Radio color="secondary" />}
          key={index}
          label={option}
          value={option}
        />
      ))}
    </RadioGroup>
  </FormControl>
);
