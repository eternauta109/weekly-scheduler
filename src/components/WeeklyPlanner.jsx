// src/components/WeekPlanner.jsx
import React, { useState } from "react";
import { Box, Button, ButtonGroup, Container } from "@mui/material";
import DaySchedule from "./DaySchedule";

const days = [
  "Lunedì",
  "Martedì",
  "Mercoledì",
  "Giovedì",
  "Venerdì",
  "Sabato",
  "Domenica",
];
const operators = [
  "Mario",
  "Luigi",
  "Giulia",
  "Anna",
  "Marco",
  "Luca",
  "Sara",
  "Paolo",
  "Elisa",
  "Rossello",
  "Bedllo",
  "Corleone",
  "SAndrone",
];

const initialShifts = operators.reduce((acc, op) => {
  acc[op] = days.reduce((dayMap, day) => {
    dayMap[day] = { start: 17, end: 23 };
    return dayMap;
  }, {});
  return acc;
}, {});

const initialHours = days.reduce((acc, day) => {
  acc[day] = { minHour: 10, maxHour: 25 };
  return acc;
}, {});

export default function WeekPlanner() {
  const [selectedDay, setSelectedDay] = useState("Lunedì");
  const [shifts, setShifts] = useState(initialShifts);
  const [hours, setHours] = useState(initialHours);

  const updateShift = (operator, day, newShift) => {
    setShifts((prev) => ({
      ...prev,
      [operator]: {
        ...prev[operator],
        [day]: newShift,
      },
    }));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <ButtonGroup variant="outlined" sx={{ mb: 2 }}>
        {days.map((day) => (
          <Button
            key={day}
            onClick={() => setSelectedDay(day)}
            variant={selectedDay === day ? "contained" : "outlined"}
          >
            {day.toUpperCase()}
          </Button>
        ))}
      </ButtonGroup>

      <DaySchedule
        day={selectedDay}
        operators={operators}
        shifts={shifts}
        onUpdateShift={updateShift}
        minHour={hours[selectedDay].minHour}
        maxHour={hours[selectedDay].maxHour}
      />
    </Container>
  );
}
