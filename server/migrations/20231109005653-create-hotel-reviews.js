"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("hotel_reviews", {
      hore_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      hore_user_review: {
        type: Sequelize.TEXT,
      },
      hore_rating: {
        type: Sequelize.INTEGER,
      },
      hore_created_on: {
        type: Sequelize.DATE,
      },
      hore_user_id: {
        type: Sequelize.INTEGER,
      },
      hore_hotel_id: {
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
    await queryInterface.dropTable("hotel_reviews");
  },
};
