export function fetchMockCandleData() {
    const now = Math.floor(Date.now() / 1000);
    const candles = [];
  
    for (let i = 0; i < 200; i++) {
      const time = now - (200 - i) * 60;
      const open = Math.random() * 5 + 10;
      const close = open + (Math.random() - 0.5) * 2;
      const high = Math.max(open, close) + Math.random();
      const low = Math.min(open, close) - Math.random();
      candles.push({ time, open, high, low, close });
    }
  
    return candles;
  }
  