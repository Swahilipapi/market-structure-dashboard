import { useEffect } from "react";

function calculateEMA(data, period) {
  let ema = [];
  let k = 2 / (period + 1);
  let previous = data[0].close;

  for (let i = 0; i < data.length; i++) {
    const price = data[i].close;
    const point = i === 0 ? price : (price * k) + (previous * (1 - k));
    ema.push({ time: data[i].time, value: point });
    previous = point;
  }

  return ema;
}

export default function EMAOverlay({ chart, data, fast = 10, slow = 50, show = true }) {
  useEffect(() => {
    if (!chart || !data.length || !show) return;

    const fastLine = chart.addLineSeries({ color: "orange", lineWidth: 1 });
    const slowLine = chart.addLineSeries({ color: "cyan", lineWidth: 1 });

    fastLine.setData(calculateEMA(data, fast));
    slowLine.setData(calculateEMA(data, slow));
  }, [chart, data, fast, slow, show]);

  return null;
}
