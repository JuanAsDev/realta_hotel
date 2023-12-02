const { hotels, hotel_reviews } = require("../models");
const moment = require("moment");
const { Op } = require("sequelize");

const createHotel = async (req, res) => {
  try {
    const hotelData = req.body;
    const newHotel = await hotels.create(hotelData);
    res.json(newHotel);
  } catch (error) {
    console.log("ini error", error.message);
    res.status(500).json(error.message);
  }
};

const formatDate = (date) => {
  return moment(date).format("DD-MMM-YYYY");
};

const getHotels = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;

    let offset = 0;
    if (page > 1) {
      offset = (page - 1) * limit;
    }

    const allHotels = await hotels.findAndCountAll({
      include: [{ model: hotel_reviews, as: "hotel_reviews" }],
      order: [["hotel_id", "ASC"]],
      limit,
      offset,
    });

    const formattedHotels = allHotels.rows.map((hotel) => {
      const modifiedDate = formatDate(hotel.hotel_modified_date);
      return {
        ...hotel.toJSON(),
        hotel_modified_date: modifiedDate,
      };
    });

    res.json({
      totalItems: allHotels.count,
      totalPages: Math.ceil(allHotels.count / limit),
      currentPage: page,
      hotels: formattedHotels,
    });
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
    console.error("Error creating facility:", error.message);

    res.status(500).json({ error: error.message });
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
const searchHotel = async (req, res) => {
  try {
    const { searchTerm } = req.query;

    const searchResult = await hotels.findAll({
      where: {
        hotel_name: {
          [Op.iLike]: `%${searchTerm}%`,
        },
      },
    });
    console.log("result", searchResult);

    res.json({ hotels: searchResult });
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ error: "Gagal melakukan pencarian hotel" });
  }
};

const getHotelById = async (req, res) => {
  try {
    const { hotel_id } = req.params;

    const hotel = await hotels.findOne({
      where: { hotel_id },
      include: [{ model: hotel_reviews, as: "hotel_reviews" }],
    });

    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    const modifiedDate = formatDate(hotel.hotel_modified_date);
    const formattedHotel = {
      ...hotel.toJSON(),
      hotel_modified_date: modifiedDate,
    };

    res.json({ hotel: formattedHotel });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotel details" });
  }
};
module.exports = {
  createHotel,
  getHotels,
  updateHotel,
  deleteHotel,
  searchHotel,
  getHotelById,
};
