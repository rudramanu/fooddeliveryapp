const mongoose = require("mongoose");

const menuSchema = mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
});
const MenuModel = mongoose.model("menu", menuSchema);

const restaurantSchema = mongoose.Schema({
  name: String,
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String,
  },
  menu: {
    type: [menuSchema],
  },
});

const RestaurantModel = mongoose.model("restaurant", restaurantSchema);

module.exports = { RestaurantModel, MenuModel };
