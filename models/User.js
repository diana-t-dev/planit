module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {
    
    username: {type: DataTypes.STRING, allowNull:false},
    usernameId: {type: DataTypes.STRING, allowNull:false},
    image: {type: DataTypes.STRING, allowNull:false},
    friends: DataTypes.TEXT,
    // groups: DataTypes.TEXT
  },
  {
    timestamps: false
  });

user.associate = function(models) {
    
    user.belongsToMany(models.group, {
       through: 'userGroup'
    });
  };
  
  return user;
};
