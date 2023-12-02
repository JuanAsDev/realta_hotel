const express = require("express");
const facilitiesRoute = express.Router();
const facilitiesController = require("../controller/facilitiesController");

facilitiesRoute.post("/create", facilitiesController.createFacility);
facilitiesRoute.get("/facilities", facilitiesController.getFacilities);
facilitiesRoute.get(
  "/facilities/:faci_id",
  facilitiesController.getFacilityById
);
facilitiesRoute.put(
  "/facilities/:faci_id",
  facilitiesController.updateFacility
);
facilitiesRoute.delete(
  "/facilities/:faci_id",
  facilitiesController.deleteFacility
);

module.exports = facilitiesRoute;
