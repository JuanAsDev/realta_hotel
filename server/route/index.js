const route = require("express").Router();

route.get("/", (req, res) => {
  res.json({ message: "home page" });
});

const facilityRoute = require("./facility");
const facilitiesRoute = require("./facilities");
const hotelsRoute = require("./hotels");
const hotelreviewsRoute = require("./hotelreviews");
const facilitypricehistoryRoute = require("./facilitypricehistory");
const addressRoute = require("./address");
const usersRoute = require("./users");
const categorygroupRoute = require("./category_group");

route.use("/facility", facilityRoute);
route.use("/facilities", facilitiesRoute);
route.use("/hotels", hotelsRoute);
route.use("/hotelreviews", hotelreviewsRoute);
route.use("/facilitypricehistory", facilitypricehistoryRoute);
route.use("/address", addressRoute);
route.use("/users", usersRoute);
route.use("/categorygroup", categorygroupRoute);

module.exports = route;
