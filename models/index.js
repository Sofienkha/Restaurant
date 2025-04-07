const User = require('./User');
const ServiceProvider = require('./ServiceProvider');
const Customer = require('./Customer');
const Order = require('./Order');
const Menu = require('./Menu');
const MenuSection = require('./MenuSection');
const MenuItem = require('./MenuItem');
const Calendar = require('./Calendar');
const Financial = require('./Financial');
const Vehicle = require('./Vehicle');
const Photo = require('./Photo');

// Define relationships
User.hasOne(ServiceProvider);
User.hasOne(Customer);
ServiceProvider.belongsTo(User);
Customer.belongsTo(User);

Customer.hasMany(Order);
ServiceProvider.hasMany(Order);
Order.belongsTo(Customer);
Order.belongsTo(ServiceProvider);

ServiceProvider.hasOne(Menu);
Menu.belongsTo(ServiceProvider);

Menu.hasMany(MenuSection);
MenuSection.belongsTo(Menu);

MenuSection.hasMany(MenuItem);
MenuItem.belongsTo(MenuSection);

ServiceProvider.hasOne(Calendar);
Calendar.belongsTo(ServiceProvider);

Order.hasOne(Financial);
Financial.belongsTo(Order);

ServiceProvider.hasMany(Vehicle);
Vehicle.belongsTo(ServiceProvider);

ServiceProvider.hasMany(Photo);
Photo.belongsTo(ServiceProvider);

module.exports = {
  User,
  ServiceProvider,
  Customer,
  Order,
  Menu,
  MenuSection,
  MenuItem,
  Calendar,
  Financial,
  Vehicle,
  Photo
};