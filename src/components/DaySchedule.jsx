// src/components/DaySchedule.jsx
import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import ShiftRow from "./ShiftRow";

export default function DaySchedule({
  day,
  operators,
  shifts,
  onUpdateShift,
  minHour,
  maxHour,
}) {
  const intervalCount = (maxHour - minHour) * 2;
  const overlapCounts = Array.from({ length: intervalCount }).fill(0);

  operators.forEach((op) => {
    const shift = shifts[op][day];
    if (!shift) return;
    const startIndex = Math.floor((shift.start - minHour) * 2);
    const endIndex = Math.ceil((shift.end - minHour) * 2);
    for (let i = startIndex; i < endIndex; i++) {
      overlapCounts[i] += 1;
    }
  });

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        {day}
      </Typography>

      <Box>
        {operators.map((op) => {
          const shift = shifts[op][day];
          if (!shift) return null;
          return (
            <ShiftRow
              key={op}
              name={op}
              start={shift.start}
              end={shift.end}
              minHour={minHour}
              maxHour={maxHour}
              onChange={(newShift) => onUpdateShift(op, day, newShift)}
            />
          );
        })}
      </Box>

      <Box mt={2} ml="16.66%">
        <Box display="flex" mb={0.5}>
          {Array.from({ length: (maxHour - minHour) * 2 }).map((_, idx) => {
            const hour = minHour + idx * 0.5;
            const label = Number.isInteger(hour)
              ? `${String(hour).padStart(2, "0")}:00`
              : "";
            return (
              <Box
                key={idx}
                sx={{ width: 25, fontSize: 10, textAlign: "center" }}
              >
                {label}
              </Box>
            );
          })}
        </Box>
        <Box display="flex">
          {overlapCounts.map((count, idx) => (
            <Box
              key={idx}
              sx={{
                width: 25,
                height: 20,
                bgcolor: count > 0 ? "primary.main" : "transparent",
                color: count > 0 ? "white" : "transparent",
                textAlign: "center",
                fontSize: 12,
                border: "1px solid #ccc",
              }}
            >
              {count}
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
}
