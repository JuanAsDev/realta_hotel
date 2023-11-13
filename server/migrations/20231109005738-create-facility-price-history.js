"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("facility_price_histories", {
      faph_faci_id: {
        type: Sequelize.INTEGER,
      },

      faph_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      faph_startdate: {
        type: Sequelize.DATE,
      },
      faph_enddate: {
        type: Sequelize.DATE,
      },
      faph_low_price: {
        type: Sequelize.INTEGER,
      },
      faph_high_price: {
        type: Sequelize.INTEGER,
      },
      faph_rate_price: {
        type: Sequelize.INTEGER,
      },
      faph_discount: {
        type: Sequelize.INTEGER,
      },
      faph_tax_rate: {
        type: Sequelize.INTEGER,
      },
      faph_modified_date: {
        type: Sequelize.DATE,
      },
      faph_user_id: {
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
    await queryInterface.dropTable("facility_price_histories");
  },
};
