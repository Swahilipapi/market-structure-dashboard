import { useEffect } from "react";

function calculateRSI(data, period = 14) {
  const rsi = [];
  let gains = 0, losses = 0;

  for (let i = 1; i <= period; i++) {
    const delta = data[i].close - data[i - 1].close;
    if (delta >= 0) gains += delta;
    else losses -= delta;
  }

  let avgGain = gains / period;
  let avgLoss = losses / period;

  for (let i = period + 1; i < data.length; i++) {
    const delta = data[i].close - data[i - 1].close;
    avgGain = ((avgGain * (period - 1)) + Math.max(delta, 0)) / period;
    avgLoss = ((avgLoss * (period - 1)) + Math.max(-delta, 0)) / period;

    const rs = avgGain / avgLoss || 0;
    const value = 100 - (100 / (1 + rs));
    rsi.push({ time: data[i].time, value });
  }

  return rsi;
}

export default function RSIOverlay({ chart, data, show = true }) {
  useEffect(() => {
    if (!chart || !data.length || !show) return;

    const rsiSeries = chart.addLineSeries({ color: "purple", lineWidth: 1 });
    rsiSeries.setData(calculateRSI(data));
  }, [chart, data, show]);

  return null;
}
