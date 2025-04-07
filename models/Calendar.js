const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Calendar = sequelize.define('Calendar', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  serviceProviderId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'ServiceProviders',
      key: 'id'
    }
  },
  bookedDates: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  availableSlots: {
    type: DataTypes.JSONB,
    defaultValue: []
  }
});

module.exports = Calendar;