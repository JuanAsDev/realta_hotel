const express = require("express");
const router = express.Router();
const addressController = require("../controller/addressController");

router.get("/addresses", addressController.getAllAddresses);
router.post("/addresses", addressController.createAddress);
router.put("/addresses/:addr_id", addressController.updateAddress);
router.delete("/addresses/:addr_id", addressController.deleteAddress);

module.exports = router;
