module.exports = function(sequelize, DataTypes) {
  var group = sequelize.define("group", {
    
    event: DataTypes.TEXT,
    user: DataTypes.Text
    
  });

group.associate = function(models) {
    group.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    });

}

  return group;
};
