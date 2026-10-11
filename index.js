


const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

 

//  db connection  

// routes 
app.use("/api", router);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
