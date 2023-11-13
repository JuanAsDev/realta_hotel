const { address } = require("../models");

const getAllAddresses = async (req, res) => {
  try {
    const addresses = await address.findAll();
    res.status(200).json(addresses);
  } catch (error) {
    res.status(400).json({ error: "Gagal mendapatkan alamat." });
  }
};

const createAddress = async (req, res) => {
  try {
    const newAddress = await address.create(req.body);
    res.status(201).json(newAddress);
  } catch (error) {
    res.status(400).json({ error: "Gagal membuat alamat baru." });
  }
};

const updateAddress = async (req, res) => {
  try {
    const { addr_id } = req.params;
    const updatedAddress = await address.update(req.body, {
      where: { addr_id },
    });

    if (updatedAddress[0] === 1) {
      res.status(200).json({ message: "Alamat berhasil diperbarui." });
    } else {
      res.status(404).json({ error: "Alamat tidak ditemukan." });
    }
  } catch (error) {
    res.status(400).json({ error: "Gagal memperbarui alamat." });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { addr_id } = req.params;
    const deletedAddress = await address.destroy({
      where: { addr_id },
    });

    if (deletedAddress === 1) {
      res.status(200).json({ message: "Alamat berhasil dihapus." });
    } else {
      res.status(404).json({ error: "Alamat tidak ditemukan." });
    }
  } catch (error) {
    res.status(400).json({ error: "Gagal menghapus alamat." });
  }
};

module.exports = {
  getAllAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
};
