module.exports = function(sequelize, DataTypes) {
  var comment = sequelize.define("comment", {
    
    user: DataTypes.TEXT,
    comment: DataTypes.TEXT
    
  },
  {
    timestamps: false
  });

  comment.associate = function(models) {
    comment.belongsTo(models.event, {
      foreignKey: {
        allowNull: false
      }
    });

}
  return comment;
};
