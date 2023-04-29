const express = require("express");
const { RestaurantModel, MenuModel } = require("../models/rest.model");
const { authenticate } = require("../middleware/authenticate");
const restRouter = express.Router();

restRouter.get("/", async (req, res) => {
  let restaurants = await RestaurantModel.find();
  res.send(restaurants);
});
restRouter.post("/post", authenticate, async (req, res) => {
  const payload = req.body;
  try {
    const new_restaurant = new RestaurantModel(payload);
    await new_restaurant.save();
    res.send("Added new Restaurant");
  } catch (error) {
    res.send("Error while creating restaurants");
  }
});

restRouter.get("/:id", authenticate, async (req, res) => {
  const id = req.params.id;
  let restaurants = await RestaurantModel.findOne({ _id: id });
  res.send(restaurants);
});

restRouter.get("/:id/menu", authenticate, async (req, res) => {
  const id = req.params.id;
  let restaurants = await RestaurantModel.findOne({ _id: id });
  res.send(restaurants.menu);
});

restRouter.post("/:id/menu", authenticate, async (req, res) => {
  const id = req.params.id;
  let restaurants = await RestaurantModel.findOne({ _id: id });
  console.log(restaurants);
  if (restaurants) {
    const payload = req.body;
    restaurants.menu.push(payload);
    console.log("1");
    try {
      console.log("2");
      const new_menu = new MenuModel(payload);
      await new_menu.save();

      res.send("Added new menu");
    } catch (error) {
      res.send("Error while finding restaurants");
    }
  }
});

restRouter.delete("/:id1/menu/:id", authenticate, async (req, res) => {
  const id1 = req.params.id1;
  const id = req.params.id;
  let restaurants = await RestaurantModel.findOne({ _id: id1 });
  if (restaurants) {
    await MenuModel.findByIdAndRemove({ _id: id });
    res.send("Menu Deleted");
  } else {
    res.send("Restaurant not available");
  }
});
module.exports = { restRouter };
