"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class hotels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.hotels.hasMany(models.hotel_reviews, {
        foreignKey: "hore_hotel_id",
      });
    }
  }
  hotels.init(
    {
      hotel_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Automatically gets converted to SERIAL for postgres
      },
      hotel_name: DataTypes.TEXT,
      hotel_description: DataTypes.TEXT,
      hotel_rating_star: DataTypes.INTEGER,
      hotel_phonenumber: DataTypes.TEXT,
      hotel_status: DataTypes.BOOLEAN,
      hotel_reason: DataTypes.TEXT,
      hotel_modified_date: DataTypes.DATE,
      hotel_addr_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "hotels",
    }
  );
  return hotels;
};
