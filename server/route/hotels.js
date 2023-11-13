const express = require("express");
const hotelRoute = express.Router();
const hotelController = require("../controller/hotelsController");

hotelRoute.post("/create", hotelController.createHotel);
hotelRoute.get("/gethotels", hotelController.getHotels);
hotelRoute.put("/update/:hotel_id", hotelController.updateHotel);
hotelRoute.delete("/delete/:hotel_id", hotelController.deleteHotel);

module.exports = hotelRoute;
