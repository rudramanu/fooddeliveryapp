const express = require("express");
const cors = require("cors");
const { connection } = require("./configs/db");
const { userRouter } = require("./routes/user.route");
const { restRouter } = require("./routes/rest.route");
const { orderRouter } = require("./routes/order.route");
const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();
app.get("/home", (req, res) => {
  res.send("getting1");
});
app.use("/", userRouter);
app.use("/restaurants", restRouter);
app.use("/orders", orderRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log("Getting error while connecting to DB");
  }
  console.log(`Running to port ${process.env.port}`);
});
