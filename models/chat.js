module.exports = function(sequelize, DataTypes) {
  var chat = sequelize.define("chat", {
    
    name: {type: DataTypes.STRING, allowNull:false},
    text: {type: DataTypes.TEXT, allowNull:false}
  },
  {
    timestamps: false
  });

    chat.associate = function(models) {
    
    chat.belongsTo(models.channel, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return chat;
};
