module.exports = function(sequelize, DataTypes) {
  var group = sequelize.define("group", {
    
    event: DataTypes.TEXT,
    user: DataTypes.TEXT
    
  });

// group.associate = function(models) {
//     group.belongsToMany(models.user, {
//       through: "group2user"
//     });

// }

  return group;
};
