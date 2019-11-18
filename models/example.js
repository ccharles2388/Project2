module.exports = function(sequelize, DataTypes) {
  var Reminder = sequelize.define("Reminder", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Reminder;
};
