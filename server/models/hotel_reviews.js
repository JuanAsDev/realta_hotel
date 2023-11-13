"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class hotel_reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.hotel_reviews.belongsTo(models.hotels, {
        foreignKey: "hore_hotel_id",
      });
    }
  }
  hotel_reviews.init(
    {
      hore_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Automatically gets converted to SERIAL for postgres
      },
      hore_user_review: DataTypes.TEXT,
      hore_rating: DataTypes.INTEGER,
      hore_created_on: DataTypes.DATE,
      hore_user_id: DataTypes.INTEGER,
      hore_hotel_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "hotel_reviews",
    }
  );
  return hotel_reviews;
};
