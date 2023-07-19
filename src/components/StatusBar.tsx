import React from "react";
import { AppBar, IconButton, Toolbar } from "@mui/material";

type StatusBarProps = {
  color?: "secondary";
  header: React.ReactElement;
  icon: React.ReactElement;
  onIconClick: () => void;
};

export const StatusBar = ({
  color,
  header,
  icon,
  onIconClick,
}: StatusBarProps) => (
  <AppBar color={color} position="sticky">
    <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
      {header}
      <IconButton
        aria-label="list"
        color="inherit"
        edge="start"
        onClick={onIconClick}
        size="large"
      >
        {icon}
      </IconButton>
    </Toolbar>
  </AppBar>
);
