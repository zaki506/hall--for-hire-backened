'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Halls extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.User, { foreignKey: vendor_id });
    }
  }
  Halls.init({
    title: DataTypes.STRING,
    desc: DataTypes.STRING,
    vendor_id: DataTypes.INTEGER,
    capacity: DataTypes.STRING,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
    phone1: DataTypes.STRING,
    phone2: DataTypes.STRING,
    email: DataTypes.STRING,
    std_code: DataTypes.STRING,
    landline: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Halls',
  });
  return Halls;
};