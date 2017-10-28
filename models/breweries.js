'use strict';

 module.exports = function (sequelize, DataTypes) {
   const Brewery = sequelize.define('Brewery', {
     breweryname: DataTypes.STRING,
     username: DataTypes.INTEGER
  //  }, {
  //   classMethods: {
  //     associate: function (models) {
  //       Beer.belongsToMany(models.User);
   //
  //     }
  //   }
  });
  return Brewery;
 };
