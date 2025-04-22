// src/components/ShiftRow.jsx
import React, { useRef } from "react";
import { Box, Typography, Tooltip } from "@mui/material";

const HOUR_WIDTH = 50;

function formatHour(hour) {
  const h = Math.floor(hour);
  const m = Math.round((hour - h) * 60);
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

export default function ShiftRow({
  name,
  start,
  end,
  minHour,
  maxHour,
  onChange,
}) {
  const boxRef = useRef(null);
  const duration = end - start;
  const pixelOffset = useRef(0);

  const handleMouseDownMove = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const initialStart = start;

    const onMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const raw = initialStart + deltaX / HOUR_WIDTH;
      const clamped = Math.max(minHour, Math.min(raw, maxHour - duration));
      pixelOffset.current = deltaX;
      onChange({ start: clamped, end: clamped + duration });
    };

    const onMouseUp = () => {
      const raw = initialStart + pixelOffset.current / HOUR_WIDTH;
      const snapped = Math.round(raw * 4) / 4;
      const finalStart = Math.max(
        minHour,
        Math.min(snapped, maxHour - duration)
      );
      onChange({ start: finalStart, end: finalStart + duration });
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const handleResizeRight = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const startX = e.clientX;
    const initialEnd = end;

    const onMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      pixelOffset.current = deltaX;
      const raw = initialEnd + deltaX / HOUR_WIDTH;
      const clamped = Math.max(start + 0.25, Math.min(raw, maxHour));
      onChange({ start, end: clamped });
    };

    const onMouseUp = () => {
      const raw = initialEnd + pixelOffset.current / HOUR_WIDTH;
      const snapped = Math.round(raw * 4) / 4;
      const newEnd = Math.max(start + 0.25, Math.min(snapped, maxHour));
      onChange({ start, end: newEnd });
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const shiftLeft = (start - minHour) * HOUR_WIDTH;
  const shiftWidth = (end - start) * HOUR_WIDTH;

  return (
    <Box display="flex" width="100%" alignItems="center" height={40}>
      <Box flex={2} px={2}>
        <Typography fontWeight="bold">{name}</Typography>
      </Box>
      <Box
        flex={10}
        ref={boxRef}
        position="relative"
        sx={{ bgcolor: "#f0f0f0", height: "100%", overflow: "hidden" }}
      >
        <Tooltip
          title={`${formatHour(start)} - ${formatHour(end)}`}
          placement="top"
          arrow
        >
          <Box
            onMouseDown={handleMouseDownMove}
            sx={{
              position: "absolute",
              top: 6,
              left: shiftLeft,
              width: shiftWidth,
              height: 28,
              bgcolor: "success.light",
              borderRadius: 1,
              boxShadow: 1,
              cursor: "default",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
              overflow: "hidden",
              clipPath: "inset(0 0 0 0)",
            }}
          >
            <Typography variant="body2" sx={{ cursor: "move" }}>
              {formatHour(start)} - {formatHour(end)}
            </Typography>
            <Box
              onMouseDown={handleResizeRight}
              sx={{
                position: "absolute",
                right: 0,
                top: 0,
                bottom: 0,
                width: 8,
                cursor: "ew-resize",
                bgcolor: "rgba(0,0,0,0.1)",
              }}
            />
          </Box>
        </Tooltip>
      </Box>
    </Box>
  );
}
