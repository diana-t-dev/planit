module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {
    
    username: {type: DataTypes.STRING, allowNull:false},
    password: {type: DataTypes.STRING, allowNull:false},
    friends: DataTypes.TEXT,
    groups: DataTypes.TEXT,
    notifications: DataTypes.TEXT
  });

// user.associate = function(models) {
    
//     user.belongsToMany(models.group, {
//       through: "group2user"
//     });
//   };
  
  return user;
};
