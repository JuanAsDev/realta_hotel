"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("hotels", {
      hotel_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      hotel_name: {
        type: Sequelize.TEXT,
      },
      hotel_description: {
        type: Sequelize.TEXT,
      },
      hotel_rating_star: {
        type: Sequelize.INTEGER,
      },
      hotel_phonenumber: {
        type: Sequelize.TEXT,
      },
      hotel_status: {
        type: Sequelize.BOOLEAN,
      },
      hotel_reason: {
        type: Sequelize.TEXT,
      },
      hotel_modified_date: {
        type: Sequelize.DATE,
      },
      hotel_addr_id: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("hotels");
  },
};
