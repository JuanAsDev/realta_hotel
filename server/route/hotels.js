const express = require("express");
const hotelRoute = express.Router();
const hotelController = require("../controller/hotelsController");

hotelRoute.post("/create", hotelController.createHotel);
hotelRoute.get("/gethotels", hotelController.getHotels);
hotelRoute.get("/gethotels/:hotel_id", hotelController.getHotelById);

hotelRoute.put("/update/:hotel_id", hotelController.updateHotel);
hotelRoute.delete("/delete/:hotel_id", hotelController.deleteHotel);
hotelRoute.get("/search", hotelController.searchHotel);
module.exports = hotelRoute;
