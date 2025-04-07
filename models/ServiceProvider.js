const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ServiceProvider = sequelize.define('ServiceProvider', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  type: {
    type: DataTypes.ENUM('Restaurant', 'CateringAgency', 'Freelancer', 'PastryService', 'CarService', 'Florist', 'Entertainment', 'Photographer', 'Venue', 'Decorator'),
    allowNull: false
  }
});

module.exports = ServiceProvider;