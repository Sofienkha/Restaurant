const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MenuSection = sequelize.define('MenuSection', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  menuId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Menus',
      key: 'id'
    }
  },
  sectionName: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = MenuSection;