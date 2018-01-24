module.exports = function(sequelize, DataTypes) {
  var channel = sequelize.define("channel", {
    
    name: {type: DataTypes.STRING, allowNull:false}
  },
  {
    timestamps: false
  });

    channel.associate = function(models) {
    
    channel.hasMany(models.chat, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return channel;
};
