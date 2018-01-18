module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {
    
    username: {type:DataTypes.STRING, allowNull:false},
    password: {type:DataTypes.STRING, allowNull:false},
    friends: DataTypes.TEXT,
    groups: DataTypes.TEXT,
    notifications: DataTypes.Text
  });

user.associate = function(models) {
    
    user.hasMany(models.post, {
      onDelete: "cascade"
    });
  };
  
  return user;
};
