// ✅ Improved ChartContainer.jsx with responsive and clean config
import React, { useRef, useEffect } from "react";
import { createChart } from "lightweight-charts";

export default function ChartContainer({ children }) {
  const chartRef = useRef(null);
  const containerRef = useRef();

  useEffect(() => {
    const chart = createChart(containerRef.current, {
      width: containerRef.current.clientWidth,
      height: 500,
      layout: {
        backgroundColor: "#1e1e1e",
        textColor: "#ffffff",
      },
      grid: {
        vertLines: {
          color: "#2b2b2b",
        },
        horzLines: {
          color: "#2b2b2b",
        },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        borderColor: "#485c7b",
      },
      rightPriceScale: {
        autoScale: true,
        borderVisible: true,
        scaleMargins: {
          top: 0.2,
          bottom: 0.2,
        },
      },
      crosshair: {
        mode: 0, // Normal
      },
    });

    chartRef.current = chart;
    return () => chart.remove();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "500px", position: "relative" }}
    >
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { chart: chartRef.current })
      )}
    </div>
  );
}