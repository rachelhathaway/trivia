import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import { List } from "@mui/icons-material";

type StatusBarProps = {
  numCorrectAnswers: number;
  numTotalAnswers: number;
  onListClick: () => void;
};

export const StatusBar = ({
  numCorrectAnswers,
  numTotalAnswers,
  onListClick,
}: StatusBarProps) => (
  <AppBar position="sticky">
    <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
      <IconButton
        aria-label="list"
        color="inherit"
        edge="start"
        onClick={onListClick}
        size="large"
      >
        <List />
      </IconButton>
      <Box>{`${numCorrectAnswers} / ${numTotalAnswers}`}</Box>
    </Toolbar>
  </AppBar>
);