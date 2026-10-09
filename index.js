


const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

 

//  db connection  

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Transpor hjgjhkjhkjhkjhkjhkjhkj is running",
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
