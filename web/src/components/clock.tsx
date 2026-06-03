"use client";

import { useEffect, useState } from "react";

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

export function DigitalClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) {
    return <div className="digital-clock" suppressHydrationWarning />;
  }

  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const blink = now.getSeconds() % 2 === 0;

  return (
    <div className="digital-clock" suppressHydrationWarning>
      <div className="dc-time">
        <span className="dc-num">{hh}</span>
        <span className="dc-colon" style={{ opacity: blink ? 1 : 0.25 }}>
          :
        </span>
        <span className="dc-num">{mm}</span>
      </div>
      <div className="dc-date">
        <span>
          {DAYS[now.getDay()]} {String(now.getDate()).padStart(2, "0")}
        </span>
        <span>
          {MONTHS[now.getMonth()]} {now.getFullYear()}
        </span>
      </div>
    </div>
  );
}
