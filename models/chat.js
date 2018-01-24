module.exports = function(sequelize, DataTypes) {
  var chat = sequelize.define("chat", {
    
    name: {type: DataTypes.STRING, allowNull:false},
    image:{type: DataTypes.STRING, allowNull:false},
    text: {type: DataTypes.TEXT, allowNull:false}
  },
  {
    timestamps: false
  });
  
  return chat;
};
