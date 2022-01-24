const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(morgan("dev"));

app.listen(PORT, () => {
  console.log(`${PORT} API SERVER START!`);
});
