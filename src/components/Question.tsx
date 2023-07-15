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
};

export const Question = ({ label, onAnswer, options }: QuestionProps) => (
  <FormControl>
    <FormLabel id="question">{label}</FormLabel>
    <RadioGroup
      aria-labelledby="question"
      onChange={(_, selectedAnswer: string) => onAnswer(selectedAnswer)}
    >
      {options.map((option) => (
        <FormControlLabel
          key={option}
          value={option}
          control={<Radio />}
          label={option}
        />
      ))}
    </RadioGroup>
  </FormControl>
);
