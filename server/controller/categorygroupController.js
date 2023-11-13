const { category_group } = require("../models"); // Sesuaikan path sesuai struktur folder Anda

const getAllCategoryGroups = async (req, res) => {
  try {
    const categoryGroups = await category_group.findAll();
    res.status(200).json(categoryGroups);
  } catch (error) {
    res.status(400).json({ error: "Gagal mendapatkan kategori grup." });
  }
};
const createCategoryGroup = async (req, res) => {
  try {
    const { namaKategori } = req.body;

    const newCategoryGroup = await category_group.create({
      nama_kategori: namaKategori, // Sesuaikan dengan nama kolom sesuai model Anda
    });

    res.status(201).json(newCategoryGroup);
  } catch (error) {
    res.status(400).json({ error: "Gagal membuat kategori grup baru." });
  }
};

module.exports = {
  getAllCategoryGroups,
  createCategoryGroup,
};
