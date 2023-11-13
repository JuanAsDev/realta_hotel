const express = require("express");
const router = express.Router();
const categoryGroupsController = require("../controller/categorygroupController"); // Sesuaikan path sesuai struktur folder Anda

router.get("/category_groups", categoryGroupsController.getAllCategoryGroups);
router.post("/category_groups", categoryGroupsController.createCategoryGroup);

module.exports = router;
