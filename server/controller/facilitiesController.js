const {
  facility_price_history,
  facility_photos,
  facilities,
} = require("../models");
const moment = require("moment");

const createFacility = async (req, res) => {
  try {
    console.log("Received request body:", req.body); // Tambahkan ini untuk melihat data yang diterima

    const newFacility = await facilities.create(req.body);
    res.status(201).json(newFacility);
  } catch (error) {
    console.error({ error: error.message });
    res.status(400).json({ error: error.message });
  }
};
const formatDate = (date) => {
  return moment(date).format("DD-MMM-YYYY");
};
const getFacilities = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;

    let offset = 0;
    if (page > 1) {
      offset = (page - 1) * limit;
    }
    const allFacilities = await facilities.findAndCountAll({
      include: [{ model: facility_price_history }, { model: facility_photos }],
      order: [["faci_id", "ASC"]],
      limit,
      offset,
    });

    const formattedfacilities = allFacilities.rows.map((facility) => {
      const modifiedDate = formatDate(facility.faci_modified_date);
      const startDate = formatDate(facility.faci_startdate);
      const endDate = formatDate(facility.faci_enddate);
      return {
        ...facility.toJSON(),
        faci_modified_date: modifiedDate,
        faci_startdate: startDate,
        faci_enddate: endDate,
      };
    });
    res.status(200).json({
      totalItems: allFacilities.count,
      totalPages: Math.ceil(allFacilities.count / limit),
      currentPage: page,
      facilities: formattedfacilities,
    });
  } catch (error) {
    console.log("errornya", error.message);
    res.status(400).json(error.message);
  }
};

const getFacilityById = async (req, res) => {
  const { faci_id } = req.params;
  try {
    const facility = await facilities.findByPk(faci_id);
    if (facility) {
      res.status(200).json(facility);
    } else {
      res.status(404).json({ error: "Fasilitas tidak ditemukan." });
    }
  } catch (error) {
    res.status(400).json({ error: "Gagal mendapatkan fasilitas." });
  }
};

const updateFacility = async (req, res) => {
  const { faci_id } = req.params;
  try {
    const [updated] = await facilities.update(req.body, {
      where: { faci_id },
    });
    if (updated) {
      const updatedFacility = await facilities.findByPk(faci_id);
      res.status(200).json(updatedFacility);
    } else {
      res.status(404).json({ error: "Fasilitas tidak ditemukan." });
    }
  } catch (error) {
    res.status(400).json({ error: "Gagal memperbarui fasilitas." });
  }
};

const deleteFacility = async (req, res) => {
  const { faci_id } = req.params;
  try {
    const deleted = await facilities.destroy({
      where: { faci_id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: error.message });
      console.log("error", error.message);
    }
  } catch (error) {
    console.log("error", error.message);
    res.status(400).json({ error: "Gagal menghapus fasilitas." });
  }
};

module.exports = {
  createFacility,
  getFacilities,
  getFacilityById,
  updateFacility,
  deleteFacility,
};
