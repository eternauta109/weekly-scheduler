// src/App.jsx
import React from "react";
import WeeklyPlanner from "./components/WeeklyPlanner";
import { Container, CssBaseline } from "@mui/material";

export default function App() {
  return (
    <Container maxWidth="xl">
      <CssBaseline />
      <WeeklyPlanner />
    </Container>
  );
}
