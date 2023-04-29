const { OrderModel } = require("../models/order.model");
const express = require("express");
const orderRouter = express.Router();
orderRouter.post("/", (req, res) => {});
module.exports = { orderRouter };
