// const express = require("express");
// const facilityRoute = express.Router();
// const facilityController = require("../controller/facilityController");
// const upload = require("../middleware/multermiddleware");

// facilityRoute.get("/getfacility", facilityController.getFacilityPhotos);
// facilityRoute.post(
//   "/create",
//   upload.single("image"),
//   facilityController.createFacilityPhotos
// );
// facilityRoute.put("/update/:id", facilityController.updateFacilityPhoto);
// facilityRoute.delete("/delete/:id", facilityController.deleteFacilityPhoto);

// module.exports = facilityRoute;
const express = require("express");
const facilityRoute = express.Router();
const facilityController = require("../controller/facilityController");
const upload = require("../middleware/multermiddleware");

facilityRoute.get("/getfacility", facilityController.getFacilityPhotos);
facilityRoute.post(
  "/create",
  upload.single("fapho_url"),
  facilityController.createFacilityPhotos
);
facilityRoute.put("/update/:id", facilityController.updateFacilityPhoto);
facilityRoute.delete("/delete/:id", facilityController.deleteFacilityPhoto);

module.exports = facilityRoute;
