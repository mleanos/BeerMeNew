'use strict';

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    profileImageUrl: DataTypes.STRING
  });

  return User;
};
