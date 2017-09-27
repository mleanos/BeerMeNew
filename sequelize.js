// const Sequelize = require('sequelize');
// var orm = {};
// console.log("Info "+ process.env.DB_NAME + process.env.DB_USER + process.env.DB_HOST);
// const sequelize = new Sequelize('express-cc', 'root', {
//   host: 'localhost',
//   dialect: 'mysql',
//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000
//   }
//
// });

// const User = sequelize.define('user', {
//   username: Sequelize.STRING,
//   email: Sequelize.STRING,
//   password: Sequelize.STRING
// });

// force: true will drop the table if it already exists
// User.sync().then(() => {
//   // Table created
//   console.log("User model created");
// });
// 
// module.exports = {
//   User:User
// };
