const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Menu = sequelize.define('Menu', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  menuId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  serviceProviderId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'ServiceProviders',
      key: 'id'
    }
  }
});

module.exports = Menu;