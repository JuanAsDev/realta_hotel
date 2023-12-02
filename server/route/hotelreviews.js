const express = require("express");
const hotelReviewRoute = express.Router();
const hotelReviewController = require("../controller/hotelreviewsController");

hotelReviewRoute.post("/create", hotelReviewController.createHotelReview);
hotelReviewRoute.get("/gethotelreviews", hotelReviewController.getHotelReviews);
hotelReviewRoute.put(
  "/update/:hore_id",
  hotelReviewController.updateHotelReview
);
hotelReviewRoute.delete(
  "/delete/:hore_id",
  hotelReviewController.deleteHotelReview
);

hotelReviewRoute.get(
  "/hotelreviewspagination",
  hotelReviewController.getHotelReviewsPagination
);

module.exports = hotelReviewRoute;
