// ✅ CandleSeries.jsx
import { useEffect } from "react";

export default function CandleSeries({ chart, data }) {
  useEffect(() => {
    if (!chart || !data.length) return;

    const candleSeries = chart.addCandlestickSeries();
    candleSeries.setData(data);
  }, [chart, data]);

  return null;
}
