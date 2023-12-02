const { hotel_reviews } = require("../models");

const createHotelReview = async (req, res) => {
  try {
    const hotelReviewData = req.body;
    const newHotelReview = await hotel_reviews.create(hotelReviewData);
    res.json(newHotelReview);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getHotelReviews = async (req, res) => {
  try {
    const allHotelReviews = await hotel_reviews.findAll();
    res.json(allHotelReviews);
  } catch (error) {
    res.status(500).json({ error: "Gagal mengambil data ulasan hotel" });
  }
};

const updateHotelReview = async (req, res) => {
  try {
    const { hore_id } = req.params;
    const updatedData = req.body;
    const updatedHotelReview = await hotel_reviews.update(updatedData, {
      where: { hore_id },
    });
    res.json(updatedHotelReview);
  } catch (error) {
    res.status(500).json({ error: "Gagal mengupdate ulasan hotel" });
  }
};

const deleteHotelReview = async (req, res) => {
  try {
    const { hore_id } = req.params;
    await hotel_reviews.destroy({ where: { hore_id } });
    res.json({ message: "Ulasan hotel berhasil dihapus" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Gagal menghapus ulasan hotel" + error.message });
  }
};

const getHotelReviewsPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 3;
  try {
    const offset = (page - 1) * limit;

    const { count, rows } = await hotel_reviews.findAndCountAll({
      offset,
      limit,
    });

    const totalPages = Math.ceil(count / limit);

    res.json({
      totalPages,
      currentPage: page,
      totalReviews: count,
      reviews: rows,
    });
  } catch (error) {
    res.status(500).json({ error: "Gagal mengambil data ulasan hotel" });
  }
};

module.exports = {
  createHotelReview,
  getHotelReviews,
  updateHotelReview,
  deleteHotelReview,
  getHotelReviewsPagination,
};
