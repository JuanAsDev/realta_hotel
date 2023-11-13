const express = require("express");
const facilityPriceHistoryRoute = express.Router();
const facilityPriceHistoryController = require("../controller/facilitypricehistoryController");

facilityPriceHistoryRoute.post(
  "/create",
  facilityPriceHistoryController.createFacilityPriceHistory
);
facilityPriceHistoryRoute.get(
  "/getfacilitypricehistories",
  facilityPriceHistoryController.getFacilityPriceHistories
);
facilityPriceHistoryRoute.put(
  "/update/:faph_id",
  facilityPriceHistoryController.updateFacilityPriceHistory
);
facilityPriceHistoryRoute.delete(
  "/delete/:faph_id",
  facilityPriceHistoryController.deleteFacilityPriceHistory
);

module.exports = facilityPriceHistoryRoute;
