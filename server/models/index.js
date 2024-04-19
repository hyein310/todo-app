const Sequelize = require("sequelize");

console.log(process.env.NODE_ENV);

let config;
if(process.env.NODE_ENV) {
  config = require(__dirname + "/../config/config.js")[process.env.NODE_ENV];
}
else {
  config = require(__dirname + "/../config/config.js")["development"];
}

// console.log(process.env.NODE_ENV); // development(개발) or production(배포) 


const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
const TodoModel = require("./Todo")(sequelize, Sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Todo = TodoModel;

module.exports = db;
