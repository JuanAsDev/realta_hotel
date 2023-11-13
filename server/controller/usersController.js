const { users } = require("../models");
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await users.findAll();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(400).json({ error: "Gagal mendapatkan data users." });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await users.findByPk(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User tidak ditemukan." });
    }
  } catch (error) {
    res.status(400).json({ error: "Gagal mendapatkan data user." });
  }
};

const createUser = async (req, res) => {
  const { user_id } = req.body;
  try {
    const newUser = await users.create({ user_id });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: "Gagal membuat user baru." });
  }
};

// Contoh fungsi untuk mengupdate user berdasarkan ID
const updateUser = async (req, res) => {
  const userId = req.params.id; // Ambil ID user dari parameter URL
  const { user_id } = req.body; // Ambil data user dari body request
  try {
    const user = await users.findByPk(userId);
    if (user) {
      await user.update({ user_id });
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User tidak ditemukan." });
    }
  } catch (error) {
    res.status(400).json({ error: "Gagal mengupdate user." });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await users.findByPk(userId);
    if (user) {
      await user.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: "User tidak ditemukan." });
    }
  } catch (error) {
    res.status(400).json({ error: "Gagal menghapus user." });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
