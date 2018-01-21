module.exports = function(sequelize, DataTypes) {
  var chat = sequelize.define("chat", {
    
    name: DataTypes.TEXT,
    text: DataTypes.TEXT
  },
  {
    timestamps: false
  });
  
  return chat;
};
