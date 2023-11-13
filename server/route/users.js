const express = require("express");
const router = express.Router();
const usersController = require("../controller/usersController"); // Sesuaikan path sesuai struktur folder Anda

router.get("/users", usersController.getAllUsers);

router.get("/users/:id", usersController.getUserById);

router.post("/users", usersController.createUser);

router.put("/users/:id", usersController.updateUser);

router.delete("/users/:id", usersController.deleteUser);

module.exports = router;
