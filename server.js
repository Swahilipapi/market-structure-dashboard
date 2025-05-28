const express = require("express");
const sockjs = require("sockjs");
const websocket_multiplex = require("websocket-multiplex");

// ✅ Node-fetch fix for CommonJS (don't change this)
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// === 1. Express app ===
const app = express();

// ✅ 2. MEXC candle API proxy (fixes CORS)
app.get("/api/candles", async (req, res) => {
  const { symbol = "BTCUSDT", interval = "1m", limit = 100 } = req.query;
  const apiUrl = `https://api.mexc.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(data);
  } catch (err) {
    console.error("❌ MEXC proxy fetch error:", err);
    res.status(500).json({ error: "Failed to fetch from MEXC" });
  }
});

// === 3. SockJS Multiplexing setup ===
const sockjs_opts = {
  sockjs_url: "http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js",
};
const service = sockjs.createServer(sockjs_opts);
const multiplexer = new websocket_multiplex.MultiplexServer(service);

const ann = multiplexer.registerChannel("ann");
ann.on("connection", (conn) => {
  conn.write("Ann says hi!");
  conn.on("data", (data) => {
    conn.write("Ann nods: " + data);
  });
});

const bob = multiplexer.registerChannel("bob");
bob.on("connection", (conn) => {
  conn.write("Bob doesn't agree.");
  conn.on("data", (data) => {
    conn.write("Bob says no to: " + data);
  });
});

const carl = multiplexer.registerChannel("carl");
carl.on("connection", (conn) => {
  conn.write("Carl says goodbye!");
  conn.end();
});

// === 4. Attach SockJS to Express server ===
service.installHandlers(app, { prefix: "/multiplex" });

// === 5. Optional HTML/static routes ===
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/multiplex.js", (req, res) => {
  res.sendFile(__dirname + "/multiplex.js");
});

// === 6. Start Server ===
console.log(" [*] Listening on 0.0.0.0:9999");
app.listen(9999, "0.0.0.0");
