// // const { Sequelize } = require('sequelize');
// // require('dotenv').config();

// // const sequelize = new Sequelize(
// //   process.env.DB_NAME,
// //   process.env.DB_USERNAME,
// //   process.env.DB_PASSWORD,
// //   {
// //     dialect: 'mysql',
// //     host: process.env.DB_HOST,
// //   }
// // );

// // module.exports = sequelize;
const { Sequelize } = require('sequelize');

// module.exports = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USERNAME,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: 'mysql',  
//   }
// );
const Sequelize = new Sequelize('csye6225', 'root', 'Writecode@123', {
  host: 'localhost',
  dialect: 'mysql'
});
module.exports = Sequelize