const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

const userRouter = require("./routers/userRouter");
const msgRouter = require("./routers/msgRouter");

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/msg", msgRouter);

app.listen(PORT, () => {
  console.log(`${PORT} API SERVER START!`);
});
