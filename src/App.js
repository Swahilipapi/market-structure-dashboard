// ✅ App.js with useMexcLiveFeed integration
import React, { useEffect, useState } from "react";

// Chart components
import ChartContainer from "./components/Chart/ChartContainer";
import CandleSeries from "./components/Chart/CandleSeries";
import KeyLevelsOverlay from "./components/Chart/KeyLevelsOverlay";
import FVGZones from "./components/Chart/FVGZones";
import EMAOverlay from "./components/Chart/EMAOverlay";
import RSIOverlay from "./components/Chart/RSIOverlay";

// UI
import TogglePanel from "./components/UI/TogglePanel";
import ErrorBanner from "./components/UI/ErrorBanner";

// Data
import { useMexcLiveFeed } from "./data/useMexcLiveFeed";
import { detectKeyLevels } from "./data/useKeyLevels";

function App() {
  const candles = useMexcLiveFeed("BTCUSDT");
  const [levels, setLevels] = useState([]);

  const [toggles, setToggles] = useState({
    KeyLevels: true,
    FVGZones: true,
    EMA: true,
    RSI: true,
  });

  useEffect(() => {
    if (candles.length) {
      setLevels(detectKeyLevels(candles));
    }
    console.log("🔥 Candle data received:", candles);
  }, [candles]);

  return (
    <div style={{ backgroundColor: "#111", minHeight: "100vh", padding: 20 }}>
      <h2 style={{ color: "#fff" }}>
        <span role="img" aria-label="chart">📊</span> Modular Trading Dashboard
      </h2>

      {candles.length === 0 && (
        <ErrorBanner message="No candle data received from MEXC. Check WebSocket feed or try another symbol." />
      )}

      <TogglePanel toggles={toggles} setToggles={setToggles} />

      <ChartContainer>
        <CandleSeries data={candles} />
        <KeyLevelsOverlay data={candles} levels={levels} show={toggles.KeyLevels} />
        <FVGZones data={candles} show={toggles.FVGZones} />
        <EMAOverlay data={candles} fast={10} slow={50} show={toggles.EMA} />
        <RSIOverlay data={candles} show={toggles.RSI} />
      </ChartContainer>
    </div>
  );
}

export default App;