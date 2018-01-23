module.exports = function(sequelize, DataTypes) {
  var group = sequelize.define("group", {
    
    person: DataTypes.TEXT,
    name: DataTypes.TEXT,
    members: DataTypes.TEXT
  },
  {
    timestamps: false
  });


  group.associate = function(models) {
    
    group.belongsTo(models.user, {
       foreignKey: {
        allowNull: true
      }
    });

    group.hasMany(models.event, {
      onDelete: "cascade"
    });
  };

  return group;
};
