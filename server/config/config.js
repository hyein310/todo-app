// package.json과 이름이 같아야 함
const dotenv = require("dotenv");
dotenv.config();

const development = {
    username:"sesac",
    password:"1234",
    database:"sesac",
    host:"127.0.0.1",
    dialect:"mysql",
};
const production = {
    username: process.env.RDS_USER_NAME,
    password: process.env.RDS_USER_PASSWORD,
    database:"sesac",
    host: process.env.RDS_HOST, // rds 엔드포인트
    dialect:"mysql",
};

module.exports = {development, production};