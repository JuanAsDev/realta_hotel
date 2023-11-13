"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class facility_photos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.facility_photos.belongsTo(models.facilities, {
        foreignKey: "fapho_faci_id",
      });
    }
  }
  facility_photos.init(
    {
      fapho_faci_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "facilities",
          key: "faci_id",
        },
      },
      fapho_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fapho_thumbnail_filename: DataTypes.TEXT,
      fapho_photo_filename: DataTypes.TEXT,
      fapho_primary: DataTypes.BOOLEAN,
      fapho_url: DataTypes.TEXT,
      fapho_modified_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "facility_photos",
    }
  );
  return facility_photos;
};
