"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class facilities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.facilities.hasMany(models.facility_photos, {
        foreignKey: "fapho_faci_id",
      });
      models.facilities.hasMany(models.facility_price_history, {
        foreignKey: "faph_faci_id",
      });
    }
  }
  facilities.init(
    {
      faci_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      faci_name: DataTypes.TEXT,
      faci_description: DataTypes.TEXT,
      faci_max_number: DataTypes.INTEGER,
      faci_measure_unit: DataTypes.TEXT,
      faci_room_number: { type: DataTypes.TEXT, unique: true },
      faci_startdate: DataTypes.DATE,
      faci_enddate: DataTypes.DATE,
      faci_low_price: DataTypes.INTEGER,
      faci_high_price: DataTypes.INTEGER,
      faci_rate_price: DataTypes.INTEGER,
      faci_discount: DataTypes.INTEGER,
      faci_tax_rate: DataTypes.INTEGER,
      faci_modified_date: DataTypes.DATE,
      faci_cagro_id: DataTypes.INTEGER,
      faci_hotel_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "facilities",
    }
  );
  return facilities;
};
