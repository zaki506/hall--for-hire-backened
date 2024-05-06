// 'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //  this.hasMany(models.User, { foreignKey: vendor_id });
      // this.hasOne(models.Halls, { foreignKey: vendor_id})

    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    mobile: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    post_code: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM(
      "admin",
      "vendor",
      "user"
    ),
    verified: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};