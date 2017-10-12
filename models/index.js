'use strict';

 var fs = require('fs');
 var path = require('path');
 const Sequelize = require('sequelize');

 var orm = {};

 console.log("Info " + process.env.DB_NAME + process.env.DB_USER + process.env.DB_HOST);

 const sequelize = new Sequelize("express-cc", "root", "root", {
   host: 'localhost',
   dialect: 'mysql',
   pool: {
     max: 5,
     min: 0,
     idle: 10000
   }

 });

 fs
   .readdirSync(__dirname)
   .filter(function (file) {
     return (file.indexOf('.') !== 0) && (file !== 'index.js');
   })
   .forEach(function (file) {
     var model = sequelize.import(path.join(__dirname, file));
     orm[model.name] = model;
   });

 Object.keys(orm).forEach(function (modelName) {
   if ('associate' in orm[modelName]) {
     orm[modelName].associate(orm);
   }
 });

 // Create tables for all models that don't
 // currently have a table in the current database.
 sequelize.sync();
 orm.sequelize = sequelize;
 orm.Sequelize = Sequelize;

 module.exports = orm;
