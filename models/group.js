module.exports = function(sequelize, DataTypes) {
  var group = sequelize.define("group", {
    

    user: DataTypes.TEXT,
    name: DataTypes.TEXT,
    members: DataTypes.TEXT
  },
  {
    timestamps: false
  });


  group.associate = function(models) {
    
    group.hasMany(models.event, {
      onDelete: "cascade"
    });
  };

  return group;
};
