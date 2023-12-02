"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("facility_photos", {
      fapho_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fapho_faci_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "facilities",
          key: "faci_id",
        },
      },

      fapho_thumbnail_filename: {
        type: Sequelize.TEXT,
      },
      fapho_photo_filename: {
        type: Sequelize.TEXT,
      },
      fapho_primary: {
        type: Sequelize.BOOLEAN,
      },
      fapho_url: {
        type: Sequelize.TEXT,
      },
      fapho_modified_date: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("facility_photos");
  },
};
