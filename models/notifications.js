module.exports = function(sequelize, DataTypes) {
  var notification = sequelize.define("notification", {
    
    user: {type: DataTypes.STRING, allowNull:false},
    to: {type: DataTypes.STRING, allowNull:false},
    type: {type: DataTypes.STRING, allowNull:false}
    
  },
  {
    timestamps: false
  });

  return notification;
};
