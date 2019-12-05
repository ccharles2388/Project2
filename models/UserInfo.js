module.exports = function(sequelize, DataTypes) {
  var UserInfo = sequelize.define("UserInfo", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  });

  // UserInfo.associate = function(models) {
  //   //   // Associating UserInfo with Posts
  //   //   // When an UserInfo is deleted, also delete any associated Posts
  //   UserInfo.hasMany(models.Reminders, {
  //     onDelete: "cascade"
  //   });
  // };

  return UserInfo;
};
