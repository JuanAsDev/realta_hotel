const { facility_price_history } = require("../models");

const createFacilityPriceHistory = async (req, res) => {
  try {
    const facilityPriceHistoryData = req.body;
    const newFacilityPriceHistory = await facility_price_history.create(
      facilityPriceHistoryData
    );
    res.status(201).json(newFacilityPriceHistory);
  } catch (error) {
    res.status(500).json({
      error: "Gagal membuat riwayat harga fasilitas." + error.message,
    });
  }
};

const getFacilityPriceHistories = async (req, res) => {
  try {
    const allFacilityPriceHistories = await facility_price_history.findAll();
    res.status(200).json(allFacilityPriceHistories);
  } catch (error) {
    res.status(500).json({
      error: "Gagal mengambil riwayat harga fasilitas." + error.message,
    });
  }
};

const updateFacilityPriceHistory = async (req, res) => {
  try {
    const { faph_id } = req.params;
    const updatedData = req.body;
    const updatedFacilityPriceHistory = await facility_price_history.update(
      updatedData,
      {
        where: { faph_id: faph_id },
      }
    );
    res.status(200).json(updatedFacilityPriceHistory);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Gagal mengupdate riwayat harga fasilitas." });
  }
};

const deleteFacilityPriceHistory = async (req, res) => {
  try {
    const { faph_id } = req.params;
    const deletefacility = await facility_price_history.destroy({
      where: { faph_id },
    });

    if (deletefacility === 0) {
      res
        .status(404)
        .json({ error: "Riwayat harga fasilitas tidak ditemukan." });
    } else {
      res
        .status(204)
        .json({ message: "Riwayat harga fasilitas berhasil dihapus." });
    }
  } catch (error) {
    res.status(500).json({ error: "Gagal menghapus riwayat harga fasilitas." });
  }
};

module.exports = {
  createFacilityPriceHistory,
  getFacilityPriceHistories,
  updateFacilityPriceHistory,
  deleteFacilityPriceHistory,
};
