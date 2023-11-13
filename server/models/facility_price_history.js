"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class facility_price_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.facility_price_history.belongsTo(models.facilities, {
        foreignKey: "faph_faci_id",
      });
    }
  }
  facility_price_history.init(
    {
      faph_faci_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "facilities",
          key: "faci_id",
        },
      },
      faph_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      faph_startdate: DataTypes.DATE,
      faph_enddate: DataTypes.DATE,
      faph_low_price: DataTypes.INTEGER,
      faph_high_price: DataTypes.INTEGER,
      faph_rate_price: DataTypes.INTEGER,
      faph_discount: DataTypes.INTEGER,
      faph_tax_rate: DataTypes.INTEGER,
      faph_modified_date: DataTypes.DATE,
      faph_user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "facility_price_history",
    }
  );
  return facility_price_history;
};
