module.exports = function(sequelize, DataTypes) {
  var notification = sequelize.define("notification", {
    
    user: {type: DataTypes.STRING, allowNull:false},
    userId: {type: DataTypes.INTEGER, allowNull:false},
    to: {type: DataTypes.STRING, allowNull:false},
    type: {type: DataTypes.STRING, allowNull:false},
    groupId: {type: DataTypes.STRING}
    
  },
  {
    timestamps: false
  });

  return notification;
};
