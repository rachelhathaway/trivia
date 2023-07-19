import React from "react";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import { List } from "@mui/icons-material";

type StatusBarProps = {
  header: React.ReactElement;
  onListClick: () => void;
};

export const StatusBar = ({ header, onListClick }: StatusBarProps) => (
  <AppBar position="sticky">
    <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
      {header}
      <IconButton
        aria-label="list"
        color="inherit"
        edge="start"
        onClick={onListClick}
        size="large"
      >
        <List />
      </IconButton>
    </Toolbar>
  </AppBar>
);
