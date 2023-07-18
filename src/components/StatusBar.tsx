import { AppBar, Box } from "@mui/material";

type StatusBarProps = {
  numCorrectAnswers: number;
  numTotalAnswers: number;
};

export const StatusBar = ({
  numCorrectAnswers,
  numTotalAnswers,
}: StatusBarProps) => (
  <AppBar position="sticky">
    <Box sx={{ display: "flex", justifyContent: "center", padding: "1rem 0" }}>
      <Box>{`${numCorrectAnswers} / ${numTotalAnswers}`}</Box>
    </Box>
  </AppBar>
);
