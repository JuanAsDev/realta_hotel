"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("facilities", {
      faci_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      faci_name: {
        type: Sequelize.TEXT,
      },
      faci_description: {
        type: Sequelize.TEXT,
      },
      faci_max_number: {
        type: Sequelize.INTEGER,
      },
      faci_measure_unit: {
        type: Sequelize.TEXT,
      },
      faci_room_number: {
        type: Sequelize.TEXT,
      },
      faci_startdate: {
        type: Sequelize.DATE,
      },
      faci_enddate: {
        type: Sequelize.DATE,
      },
      faci_low_price: {
        type: Sequelize.INTEGER,
      },
      faci_high_price: {
        type: Sequelize.INTEGER,
      },
      faci_rate_price: {
        type: Sequelize.INTEGER,
      },
      faci_discount: {
        type: Sequelize.INTEGER,
      },
      faci_tax_rate: {
        type: Sequelize.INTEGER,
      },
      faci_modified_date: {
        type: Sequelize.DATE,
      },
      faci_cagro_id: {
        type: Sequelize.INTEGER,
      },
      faci_hotel_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "hotels",
          key: "hotel_id",
        },
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
    await queryInterface.dropTable("facilities");
  },
};
