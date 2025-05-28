export function detectKeyLevels(candles) {
    if (!candles.length) return [];
  
    const open = candles[0].open;
    const close = candles[candles.length - 1].close;
    const high = Math.max(...candles.map(c => c.high));
    const low = Math.min(...candles.map(c => c.low));
  
    return [
      { label: "🟢 Daily Open", price: open, color: "green" },
      { label: "🔴 Daily Close", price: close, color: "red" },
      { label: "🔵 Swing High", price: high, color: "blue" },
      { label: "🟡 Swing Low", price: low, color: "yellow" }
    ];
  }
  