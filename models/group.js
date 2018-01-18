module.exports = function(sequelize, DataTypes) {
  var group = sequelize.define("group", {
    
    event: DataTypes.TEXT,
    user: DataTypes.TEXT
    
  },
  {
    timestamps: false
  });


  group.associate = function(models) {
    
    group.belongsToMany(models.user, {
      through: "group2user",
      as: 'usery',
      foreignKey: 'groupId'
    });
  };

  return group;
};
