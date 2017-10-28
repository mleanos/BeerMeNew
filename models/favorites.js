'use strict';

 module.exports = function (sequelize, DataTypes) {
   const Favorite = sequelize.define('Favorite', {
     favorites: DataTypes.STRING,
     theuser: DataTypes.INTEGER
  //  }, {
  //   classMethods: {
  //     associate: function (models) {
  //       Beer.belongsToMany(models.User);
   //
  //     }
  //   }
  });
  return Favorite;
 };
