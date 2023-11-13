const { facility_photos, facilities } = require("../models");

const createFacilityPhotos = async (req, res) => {
  try {
    const {
      fapho_faci_id,
      fapho_thumbnail_filename,
      fapho_primary,
      fapho_modified_date,
    } = req.body;

    const newFacilityPhoto = await facility_photos.create({
      fapho_faci_id,
      fapho_thumbnail_filename,
      fapho_photo_filename: req.file.originalname,
      fapho_primary,
      fapho_modified_date,
    });
    console.log(newFacilityPhoto);
    if (req.file && req.file.path) {
      const baseUrl = `${req.protocol}://${req.hostname}:${process.env.PORT}`;
      const faphoUrl = `${baseUrl}/public/uploads/${req.file.filename}`;

      newFacilityPhoto.fapho_url = faphoUrl;
      await newFacilityPhoto.save();
    }

    res.json(newFacilityPhoto);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getFacilityPhotos = async (req, res) => {
  try {
    const facilityPhotos = await facility_photos.findAll({
      include: [facilities],
    });
    res.json(facilityPhotos);
  } catch (error) {
    res.status(500).json({ error: "Gagal mengambil Facility Photos" });
  }
};

const updateFacilityPhoto = async (req, res) => {
  try {
    const { fapho_id } = req.params;
    const updatedData = req.body;

    const updatedFacilityPhoto = await facility_photos.update(updatedData, {
      where: { fapho_id },
    });
    res.json(updatedFacilityPhoto);
  } catch (error) {
    res.status(500).json({ error: "Gagal mengupdate Facility Photo" });
  }
};

const deleteFacilityPhoto = async (req, res) => {
  try {
    const { fapho_id } = req.params;
    await facility_photos.destroy({ where: { fapho_id } });
    const facilityPhotos = await facility_photos.findAll();
    res.json({
      message: "Facility Photo berhasil dihapus",
      data: facilityPhotos,
    });
  } catch (error) {
    res.status(500).json({ error: "Gagal menghapus Facility Photo" });
  }
};

module.exports = {
  createFacilityPhotos,
  getFacilityPhotos,
  updateFacilityPhoto,
  deleteFacilityPhoto,
};
