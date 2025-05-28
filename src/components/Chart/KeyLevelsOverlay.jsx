// ✅ KeyLevelsOverlay.jsx
import { useEffect } from "react";

export default function KeyLevelsOverlay({ chart, data, levels, show = true }) {
  useEffect(() => {
    if (!chart || !data.length || !levels.length || !show) return;

    levels.forEach((level) => {
      const line = chart.addLineSeries({
        color: level.color,
        lineWidth: 1,
        lineStyle: 2,
      });

      line.setData([
        { time: data[0].time, value: level.price },
        { time: data[data.length - 1].time, value: level.price },
      ]);
    });
  }, [chart, data, levels, show]);

  return null;
}