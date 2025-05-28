// ✅ FVGZones.jsx
import { useEffect } from "react";

function detectFVGs(candles) {
  const zones = [];
  for (let i = 2; i < candles.length; i++) {
    const c0 = candles[i - 2];
    const c2 = candles[i];

    const upGap = c0.high < c2.low;
    const downGap = c0.low > c2.high;

    if (upGap || downGap) {
      zones.push({
        from: c0.time,
        to: c2.time,
        high: Math.max(c0.high, c2.high),
        low: Math.min(c0.low, c2.low),
        direction: upGap ? "up" : "down",
      });
    }
  }
  return zones;
}

export default function FVGZones({ chart, data, show = true }) {
  useEffect(() => {
    if (!chart || !data.length || !show) return;

    const zones = detectFVGs(data);

    zones.forEach((zone) => {
      chart.addAreaSeries({
        topColor: zone.direction === "up" ? "rgba(0,255,0,0.2)" : "rgba(255,0,0,0.2)",
        bottomColor: zone.direction === "up" ? "rgba(0,255,0,0.05)" : "rgba(255,0,0,0.05)",
        lineColor: "transparent",
        lineWidth: 0,
      }).setData([
        { time: zone.from, value: zone.high },
        { time: zone.to, value: zone.high },
      ]);
    });
  }, [chart, data, show]);

  return null;
}