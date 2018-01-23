module.exports = function(sequelize, DataTypes) {
  var event = sequelize.define("event", {
    
    name: DataTypes.TEXT,
    type: DataTypes.TEXT,
    person: DataTypes.TEXT,
    votes: {type: DataTypes.INTEGER, defaultValue: 0}
    
  },
  {
    timestamps: false
  });

  event.associate = function(models) {
    
    event.belongsTo(models.group, {
      foreignKey: {
        allowNull: false
      }
    });

     event.hasMany(models.comment, {
      onDelete: "cascade"
    });

};

  return event;
};
