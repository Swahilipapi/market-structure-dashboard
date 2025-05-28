import { useEffect, useState } from "react";

export function useMexcLiveFeed(symbol = "BTCUSDT", interval = "1m") {
  const [candles, setCandles] = useState([]);

  useEffect(() => {
    const fetchCandles = async () => {
      try {
        const res = await fetch(
          `http://localhost:9999/api/candles?symbol=${symbol}&interval=${interval}`
        );
        const data = await res.json();
  
        console.log("📦 Raw MEXC data:", data); // <- now this works!
  
        const parsed = data.map((c) => ({
          time: Math.floor(c[0] / 1000),
          open: parseFloat(c[1]),
          high: parseFloat(c[2]),
          low: parseFloat(c[3]),
          close: parseFloat(c[4]),
          volume: parseFloat(c[5]),
        }));
  
        setCandles(parsed);
      } catch (err) {
        console.error("🔥 MEXC fetch error:", err);
      }
    };
  
    fetchCandles();
  }, [symbol, interval]);
  

  return candles;
}
