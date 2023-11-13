const {
  facility_price_history,
  facility_photos,
  facilities,
} = require("../models");

const createFacility = async (req, res) => {
  try {
    const newFacility = await facilities.create(req.body);
    res.status(201).json(newFacility);
  } catch (error) {
    res.status(400).json({ error: "Gagal membuat fasilitas baru." });
  }
};

const getFacilities = async (req, res) => {
  try {
    const allFacilities = await facilities.findAll({
      include: [{ model: facility_price_history }, { model: facility_photos }],
    });
    res.status(200).json(allFacilities);
  } catch (error) {
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
      res.status(404).json({ error: "Fasilitas tidak ditemukan." });
    }
  } catch (error) {
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
