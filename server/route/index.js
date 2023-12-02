const route = require("express").Router();

route.get("/", (req, res) => {
  res.json({ message: "home page" });
});

const facilityRoute = require("./facility");
const facilitiesRoute = require("./facilities");
const hotelsRoute = require("./hotels");
const hotelreviewsRoute = require("./hotelreviews");
const facilitypricehistoryRoute = require("./facilitypricehistory");

route.use("/facility", facilityRoute);
route.use("/facilities", facilitiesRoute);
route.use("/hotels", hotelsRoute);
route.use("/hotelreviews", hotelreviewsRoute);
route.use("/facilitypricehistory", facilitypricehistoryRoute);

module.exports = route;
