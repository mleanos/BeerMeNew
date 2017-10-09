'use strict';

 module.exports = function (sequelize, DataTypes) {
   const Beer = sequelize.define('Beer', {
     beername: DataTypes.STRING,
     user: DataTypes.INTEGER
   }, {
    classMethods: {
      associate: function (models) {
        Beer.hasOne(models.User, { foreignKey: 'fk_user' });

      }
    }
  });
  return Beer;
 };
