"use client";

import { useEffect, useState } from "react";

interface ISTClockProps {
  variant?: "badge" | "digital";
}

export default function ISTClock({ variant = "badge" }: ISTClockProps) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(now);
      setTime(formatted);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (variant === "digital") {
    return (
      <span className="clock">{time}</span>
    );
  }

  return (
    <div className="ist-clock-badge">
      <span className="live-dot" />
      <span className="time-text">{time}</span>
      <span className="zone-tag">IST</span>
    </div>
  );
}
