// market-structure-dashboard/src/App.jsx
import React, { useState, useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";
import { fetchMockCandleData } from "./utils/data";
import { detectKeyLevels } from "./utils/levels";

export default function App() {
  const chartContainerRef = useRef();
  const [candles, setCandles] = useState([]);
  const [keyLevels, setKeyLevels] = useState([]);

  useEffect(() => {
    async function loadData() {
      const data = await fetchMockCandleData();
      setCandles(data);
      setKeyLevels(detectKeyLevels(data));
    }
    loadData();
  }, []);

  useEffect(() => {
    if (!candles.length) return;

    const chart = createChart(chartContainerRef.current, {
      width: 900,
      height: 500,
      layout: {
        backgroundColor: "#1e1e1e",
        textColor: "#ffffff"
      },
      timeScale: {
        timeVisible: true,
      }
    });

    const candleSeries = chart.addCandlestickSeries();
    candleSeries.setData(candles);

    keyLevels.forEach(level => {
      chart.addLineSeries({
        color: level.color,
        lineWidth: 1,
        lineStyle: 2
      }).setData([
        { time: candles[0].time, value: level.price },
        { time: candles[candles.length - 1].time, value: level.price }
      ]);
    });

    return () => chart.remove();
  }, [candles, keyLevels]);

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ color: '#fff' }}>📊 Market Structure Dashboard</h2>
      <div ref={chartContainerRef} />
    </div>
  );
}
