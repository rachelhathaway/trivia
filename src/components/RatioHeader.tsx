import { Box } from "@mui/material";

type RatioHeaderProps = {
  numCorrectAnswers: number;
  numTotalAnswers: number;
};

export const RatioHeader = ({
  numCorrectAnswers,
  numTotalAnswers,
}: RatioHeaderProps) => (
  <Box>
    {numTotalAnswers === 0
      ? ""
      : `${numCorrectAnswers} / ${numTotalAnswers} question${
          numTotalAnswers === 1 ? "" : "s"
        } answered correctly`}
  </Box>
);
