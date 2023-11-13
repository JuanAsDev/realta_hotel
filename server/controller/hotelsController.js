const { address, hotels, hotel_reviews } = require("../models");

const createHotel = async (req, res) => {
  try {
    const hotelData = req.body;
    const newHotel = await hotels.create(hotelData);
    res.json(newHotel);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getHotels = async (req, res) => {
  try {
    const allHotels = await hotels.findAll({
      include: [
        { model: hotel_reviews, as: "hotel_reviews" },
        { model: address, as: "address" },
      ],
    });
    res.json(allHotels);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Gagal mengambil data hotel" + error.message });
  }
};

const updateHotel = async (req, res) => {
  try {
    const { hotel_id } = req.params;
    const updatedData = req.body;
    const updatedHotel = await hotels.update(updatedData, {
      where: { hotel_id },
    });
    res.json(updatedHotel);
  } catch (error) {
    res.status(500).json({ error: "Gagal mengupdate data hotel" });
  }
};

const deleteHotel = async (req, res) => {
  try {
    const { hotel_id } = req.params;
    await hotels.destroy({ where: { hotel_id } });
    res.json({ message: "Data hotel berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: "Gagal menghapus data hotel" });
  }
};

module.exports = {
  createHotel,
  getHotels,
  updateHotel,
  deleteHotel,
};
